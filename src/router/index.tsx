import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";
import App from "@/App";
import Blog from "@/pages/Blog";
import About from "@/pages/About";
import Shop from "@/pages/Shop";
import Contact from "@/pages/Contact";
import Product from "@/components/Product";
import Cart from "@/components/Cart";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import Profile from "@/components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/shop",
        element: <Shop />,
       
      },
      {
        path:'/shop/:productId',
        element:<Product/>
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/signin',
        element:<Signin/>
      },{
        path:'/signup',
        element:<Signup/>
      },{
        path:'/profile',
        element:<Profile/>
      }
    ],
  },
]);
