import Header from "@/components/Header";
import './mainLayout.css'
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

interface IProps {};

const componentName:FC<IProps> = () => {
    return <>
    <Header/>
    <div>
        <Outlet/>
        <Toaster
  position="top-right"
  duration={5000}
  
  toastOptions={{
    classNames: {
      title: "font-semibold",
      description: "text-muted-foreground",
      actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
      cancelButton: "bg-muted text-muted-foreground hover:bg-accent",
    },
  }}
/>
    </div>
    <Footer/>
    </>
};

export default componentName;