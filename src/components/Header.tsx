import React, { FC, useEffect, useState } from "react";
import logo from "./../assets/Logo.svg";

import { Button } from "./ui/button";

import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import Search from "./Search";

interface IProps {}

const Header: FC<IProps> = (props) => {
  
  const user = useSelector((state) => state?.user);
  
 
 

  console.log(user);
  useEffect(() => {
    if (user?.user?.accessToken) {
  
      // Safely access accessToken
      fetch("https://dummyjson.com/auth/me", {
        // Correct endpoint for getting authenticated user details
        method: "GET", // GET method is correct for /auth/me
        headers: {
          Authorization: `Bearer ${user.user.accessToken}`, // Correctly pass the token
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

          }
        })
        .catch((error) => {
          console.error("Error during token verification:", error);
          // Handle network errors or other issues
        });
    } else {
     
      fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: `${user?.user?.refreshToken}`, // Optional, if not provided, the server will use the cookie
          expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      })
        .then((res) => res.json())
        .then(console.log);
    }
  }, [user?.user?.accessToken, user?.user?.refreshToken]);

  const location = useLocation();
 
  const cart = useSelector((state) => state?.cart);
  const headerRoute = [
    { page: "Home", route: "/" },
    { page: "Shop", route: "/shop" },
    { page: "Blog", route: "/blog" },
    { page: "Contact", route: "/contact" },
    { page: "About", route: "/about" },
  ];
  return (
    <>
      <div className="flex justify-between">
        <img src={logo} />
        {location.pathname === "/shop" && (
          <div className="flex justify-center items-center">
            <Search />
          </div>
        )}

        <div className="relative inline-block">
          <Link to={"/cart"}>
            <FaShoppingCart size={30} className="text-gray-600" />
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white"
            >
              {cart.cartTotalQty}
            </Badge>
          </Link>
        </div>
      </div>

      <div className="flex justify-between bg-black mt-3 rounded-md ">
        <div className="flex justify-evenly items-center h-10 ">
          {headerRoute.map((route, index) => (
            <Link to={route.route} className="text-white ml-3" key={index}>
              {route.page}
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center">
          {user.isAuthenticated ? (
            <Link to={"/profile"}>
              {" "}
              <Button>Profile</Button>
            </Link>
          ) : (
            <Link to={"/signin"}>
              {" "}
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
