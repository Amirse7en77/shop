import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import breadCrumb from "./../assets/breadCrumb.jpeg";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slice/cartSlice";
import { toast } from "sonner";
interface IProps {}

const Product: FC<IProps> = (props) => {
  const { productId } = useParams();
  const { data, isSuccess, isLoading, error, isError } = useQuery({
    queryKey: ["product"],
    queryFn: () => axios.get(`https://dummyjson.com/products/${productId}`),
  });
  const dispatch=useDispatch()
  const handleAddToCart=()=>{
    dispatch(addToCart(data?.data))
    
        toast("product has been added successfully", {
          description: "you can see it in your basket",
          
          
         
        })
      
  }
  if (isLoading) {
    <p>please wait</p>;
  }
  if (isError) {
    <p>sth happend</p>;
  }

  return (
    <>
      {isSuccess && (
        <div>
          <div className="relative m-6">
            {" "}
            {/* Container with fixed size */}
            <img
              src={breadCrumb}
              alt="Reversed content"
              className="transform scale-x-[-1] w-full h-30 object-cover rounded-lg"
            />
            <Breadcrumb className="absolute top-4 left-4 z-10">
              <BreadcrumbList className=" text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className=" hover:text-gray-200">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/shop" className=" hover:text-gray-200">
                    Shop
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbLink  className=" hover:text-gray-200">
                    {data.data.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-2 mx-6">
            <div>
              <img className="flex-1/3 " src={data.data.thumbnail} />
            </div>
            <div>
              <h1 className="text-3xl text-green-700">{data.data.title}</h1>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
              </p>
              <div>
              <div className="space-y-4">
  <div className="flex items-center justify-center">
    <p className="text-2xl font-bold text-green-700 mb-20 mt-3 mr-3">
      ${data.data.price.toFixed(2)}
    </p>
    <Button onClick={handleAddToCart} className="bg-green-700 hover:bg-green-800 text-white mb-20 mt-3 cursor-pointer">
      Add To Cart
    </Button>

  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
