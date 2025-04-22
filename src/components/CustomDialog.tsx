import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import axios from "axios";
import { CardContent, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slice/cartSlice";
import { toast } from "sonner";

interface IProps {}

const CustomDialog: FC<IProps> = ({ children, product }) => {
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart(product));
    
    toast("product has been added successfully", {
      description: "you can see it in your basket",
      
      
     
    })
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-gray-900">
        <DialogHeader>
          <div className="flex  items-center flex-col">
            <h1 className="text-white"> {product.title}</h1>

            <img src={product.thumbnail} />

            <div className="flex justify-between w-full">
              <p className="text-white">${product.price.toFixed(2)}</p>

              <div>
                <Button
                  onClick={handleCart}
                  className="bg-green-700 text-white hover:bg-green-600 cursor-pointer"
                >
                  Add To Card
                </Button>

              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
      <CardDescription className="text-white">{product.title}</CardDescription>

      <CardContent className="text-white">
        <p>{product.category}</p>
        <p>${product.price.toFixed(2)}</p>
      </CardContent>
    </Dialog>
  );
};

export default CustomDialog;
