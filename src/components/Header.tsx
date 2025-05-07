import React, { FC, useEffect, useState } from "react";
import logo from "./../assets/Logo.svg";

import { Button } from "./ui/button";

import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { getJwtToken, getRefreshToken } from "@/services/jwtServices";
import { getUser } from "@/slice/userSlice";
import { useProductFilters } from "./customHooks/FilterParams";
import SplitText from "./ui/SplitText";

interface IProps {}

const Header: FC<IProps> = (props) => {
  const user = useSelector((state) => state?.user);
const dispatch=useDispatch()
  console.log(user);
  
  
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
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
    

{location.pathname === "/" && (<SplitText
  text="Welcome to our store!"
  className="text-3xl font-semibold text-center ml-5 mb-5"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
 
  textAlign="center"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>)}

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
