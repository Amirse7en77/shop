import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "@/slice/userSlice";

interface IProps {};

const Profile:FC<IProps> = (props) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [loggedinUser, setLoggedinUser] = useState({data:{}});
    const user = useSelector((state) => state?.user);
    const handleLoggedOut=()=>{
        dispatch(deleteUser(user))
        navigate('/signin')
    }
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
              
               
    
                setLoggedinUser({data:user});

              }
            })
            .catch((error) => {
              console.error("Error during token verification:", error);
              // Handle network errors or other issues
            });
        } 
    }
      , [user?.user?.accessToken, user?.user?.refreshToken]);
      console.log(loggedinUser)
    return <div>
        <img src={loggedinUser.data.image}/>
        <h1>{loggedinUser.data.age}</h1>
        <Button onClick={handleLoggedOut}>Log Out</Button>
    </div>
};

export default Profile;