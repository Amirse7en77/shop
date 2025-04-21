import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import axios from "axios";
import {
  Card,

} from "@/components/ui/card";

import CustomDialog from "./CustomDialog";
import { useDispatch, useSelector } from "react-redux";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const PopularCategory: FC = () => {
  
  const { data, isLoading, error, isSuccess } = useQuery<{ data: ApiResponse }>(
    {
      queryKey: ["products"],
      queryFn: () => axios.get("https://dummyjson.com/products"),
    }
  );
  const query=useSelector(state=>state.filteredShop.query)

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading popular categories...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading categories: {error.message}
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-left text-4xl">Popular Categories</h1>
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-green-700 mx-4"></div>
      </div>
      <div className="grid md:grid-cols-4  mt-4 sm:grid-cols-1 ">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="m-4 bg-green-700 animate-pulse">
                <div className="w-full h-48 bg-green-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-green-800 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-green-800 rounded w-1/2 mx-auto" />
                </div>
              </Card>
            ))}
        {data?.data.products.slice(0, 8).map((product) => (
          <Card className="m-4 bg-green-700 hover:bg-green-800 transition-colors duration-200">
            <CustomDialog product={product}><div className="w-full h-48 flex justify-center items-center overflow-hidden cursor-pointer">
                  <img
                    className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div></CustomDialog>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularCategory;
