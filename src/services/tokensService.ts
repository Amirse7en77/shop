// Add this to src/api/axiosInstance.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getRefreshToken, setJwtToken, setRefreshToken } from "./jwtServices";

const baseURL = "YOUR_API_BASE_URL"; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If token is already being refreshed, queue the original request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // Mark that we've attempted a retry
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.error("No refresh token available.");
        // clearTokens(); // Clear tokens and potentially redirect to login
        // Optionally, you might want to reject all queued requests here as well
        processQueue(error, null);
        return Promise.reject(error);
      }

      try {
        console.log("Attempting to refresh access token...");
        // Replace with your actual refresh token endpoint and payload
        const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        setJwtToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        console.log("Access token refreshed successfully.");

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken); // Process queued requests with new token
        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError: any) {
        console.error("Failed to refresh access token:", refreshError);
        // clearTokens(); // If refresh fails, clear tokens (user needs to log in again)
        processQueue(refreshError as AxiosError, null); // Reject queued requests
        // Optionally redirect to login page
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
