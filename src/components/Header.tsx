import React, { FC } from "react";
import logo from './../assets/Logo.svg'
import cart from './../assets/Cart.svg'
import { Input } from "./ui/input";
import styles from './Header.module.css'
import { Button } from "./ui/button";

import phonecall from './../assets/PhoneCall.png'
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import Search from "./Search";

interface IProps {};

const Header:FC<IProps> = (props) => {
    const location=useLocation()
    console.log(location)
    const cart=useSelector(state=>state?.cart)
    const headerRoute=[{page:'Home',route:'/'},{page:'Shop',route:'/shop'},{page:'Blog',route:'/blog'},{page:'Contact',route:'/contact'},{page:'About',route:'/about'}]
    return <>
    <div className="flex justify-between">
        <img src={logo}/>
        {(location.pathname === '/shop') && (
  <div className="flex justify-center items-center">
    <Search />
  </div>
)}
        


<div className="relative inline-block">
 <Link to={'/cart'}>
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
        {headerRoute.map((route,index)=>(
            <Link to={route.route} className="text-white ml-3" key={index}>{route.page}</Link>
        ))}
        </div>
        <div className="flex justify-center items-center">
           <Link to={'/signin'}> <Button >Sign In</Button></Link>
        </div>
        
    </div>
    </>
};

export default Header;