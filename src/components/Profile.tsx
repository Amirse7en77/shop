import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "@/slice/userSlice";

interface IProps {}

const Profile: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const user = useSelector((state) => state?.user);
  const handleLoggedOut = () => {
    dispatch(deleteUser(user));
    navigate("/signin");
  };
  
  return (
    <div>
      <img src={user.user.image} />
      <h1>{user.user.age}</h1>
      <Button onClick={handleLoggedOut}>Log Out</Button>
    </div>
  );
};

export default Profile;
