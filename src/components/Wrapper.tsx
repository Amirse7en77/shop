
import { getJwtToken, getRefreshToken} from "@/services/jwtServices"; // Assuming you have set and clear token functions
import { getUser } from "@/slice/userSlice";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  children: React.ReactNode; // Define children type
}

const Wrapper: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      const accessToken = getJwtToken();
      const refreshToken = getRefreshToken();

      console.log("Initial tokens - accessToken:", accessToken, "refreshToken:", refreshToken);

      // If no tokens exist, user is not logged in, nothing more to do here regarding auth fetch
      if (!accessToken && !refreshToken) {
        console.log("No tokens found. User is not authenticated.");
        // Optionally dispatch an action here to set user state to null or logged out
        // dispatch(setUserLoggedOut());
        return;
      }

      try {
        // --- Attempt to fetch user with existing access token ---
        const userResponse = await fetch("https://dummyjson.com/auth/me", {
          
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(userResponse)

        if (userResponse.ok) {
          // Access token is valid, dispatch user
          const user = await userResponse.json();
          console.log("Authenticated successfully with access token:", user);
          dispatch(getUser(user));
          return; // Exit if successful
        }

        // --- If initial fetch failed, check for 401 and attempt refresh ---
        if (userResponse.status === 401 && refreshToken) {
          console.log("Access token expired or invalid. Attempting token refresh...");

          const refreshResponse = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              refreshToken: refreshToken,
              expiresInMins: 1440, // optional, matches your original code
            }),
          });

          if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json();
            console.log("Token refresh successful:", newTokens);

            // **IMPORTANT:** Save the new tokens.
            // You need to implement setJwtToken and setRefreshToken in your jwtServices
            // based on how you store tokens (e.g., localStorage, cookies).
            // Example implementation:
            // setJwtToken(newTokens.accessToken);
            // setRefreshToken(newTokens.refreshToken);
             localStorage.setItem('accessToken', newTokens.accessToken)
             localStorage.setItem('refreshToken', newTokens.refreshToken)


            // --- Attempt to fetch user again with the NEW access token ---
            const newUserResponse = await fetch("https://dummyjson.com/auth/me", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${newTokens.accessToken}`,
              },
            });
            console.log(newUserResponse)

            if (newUserResponse.ok) {
              const newUser = await newUserResponse.json();
              console.log("Authenticated successfully after refresh:", newUser);
              dispatch(getUser(newUser));
              return; // Exit after successful refresh and fetch
            } else {
              // Failed to fetch user even with the new token. This is unexpected.
              console.error("Failed to fetch user with new token after refresh.", newUserResponse.status);
              // Treat as completely unauthenticated
              // clearTokens(); // Clear invalid tokens
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              // dispatch(setUserLoggedOut()); // Update Redux state
            }

          } else {
            // Refresh token failed or is also expired/invalid
            console.error("Refresh token failed or expired.", refreshResponse.status);
            // Treat as completely unauthenticated
            // clearTokens(); // Clear invalid tokens
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
            // dispatch(setUserLoggedOut()); // Update Redux state
          }
        } else {
            // Initial fetch failed with an error other than 401
            console.error(`Initial user fetch failed with status: ${userResponse.status}`);
             localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
        }

      } catch (error) {
        // Catch any network errors or exceptions during the process
        console.error("An error occurred during the authentication process:", error);
        // Treat as completely unauthenticated
         localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
        // clearTokens(); // Clear potentially bad tokens
        // dispatch(setUserLoggedOut()); // Update Redux state
      }
    };

    authenticateUser();

    // The dependency array is empty [], meaning this effect runs only once after the initial render.
    // Add 'dispatch' as a dependency since it's used inside the effect.
  }, [dispatch]);

  return <>{children}</>;
};

export default Wrapper;