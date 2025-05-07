import { signinApi, userApi } from "@/services/authServices";
import { getJwtToken, getRefreshToken } from "@/services/jwtServices";
import { getUser } from "@/slice/userSlice";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";



const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
      const accessToken= getJwtToken()
    console.log(accessToken)
      if (accessToken) {
        // Safely access accessToken
        fetch("https://dummyjson.com/auth/me", {
          // Correct endpoint for getting authenticated user details
          method: "GET", // GET method is correct for /auth/me
          headers: {
            Authorization: `Bearer ${accessToken}`, // Correctly pass the token
          },
        })
          .then((res) => {
            if (!res.ok) {
              // Handle errors, e.g., token expired or invalid
              console.error(
                "Failed to authenticate token:",
                res.status,
                res.statusText
              );
              // You might want to dispatch an action here to log the user out
              return null; // Prevent further processing
            }
            return res.json();
          })
          .then((user) => {
            if (user) {
              console.log("Authenticated user data:", user);
              dispatch(getUser(user))
              console.log(user)
            }
          })
          .catch((error) => {
            console.error("Error during token verification:", error);
            // Handle network errors or other issues
          });
      } else {
       const refreshToken= getRefreshToken()
        console.log(refreshToken)
        fetch("https://dummyjson.com/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: `${refreshToken}`, // Optional, if not provided, the server will use the cookie
            expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
          }),
          // credentials: "include", // Include cookies (e.g., accessToken) in the request
        })
          .then((res) => res.json())
          .then(console.log);
      }
    }, []);
  return <>{children}</>;
};

export default Wrapper;
