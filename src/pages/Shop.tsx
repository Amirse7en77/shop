import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import axios from "axios";
import {
  Card,

} from "@/components/ui/card";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import breadCrumb from './../assets/breadCrumb.jpeg'
import { useSelector } from "react-redux";
import InfiniteScrollComponent from "@/components/InfiniteScrollComponent";
import { motion, AnimatePresence } from "framer-motion";

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

interface IProps {}

const Shop: FC<IProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const query=useSelector(state=>state?.filteredShop.query)
  const { data, isLoading, error, isSuccess } = useQuery<{ data: ApiResponse }>(
    {
      queryKey: ["products"],
      queryFn: () => axios.get("https://dummyjson.com/products"),
    }
  );
  console.log(query)

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
  if(isSuccess){
    const filteredShop = data?.data.products.filter(product=>JSON.stringify(product).toLowerCase().includes(query))
   
   
   
    
      if (isLoading) {
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-4 mt-4 sm:grid-cols-1"
          >
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="m-4 bg-green-700 animate-pulse">
                    <div className="w-full h-48 bg-green-800" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-green-800 rounded w-3/4 mx-auto" />
                      <div className="h-4 bg-green-800 rounded w-1/2 mx-auto" />
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        );
      }
    
      // ... rest of the code
    
      return (
        <div>
          {/* Breadcrumb code */}
    
          <AnimatePresence>
            {isLoading ? (
              // Loading skeleton animation
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-4 mt-4 sm:grid-cols-1"
              >
                {/* Skeleton items */}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <InfiniteScrollComponent filteredProduct={filteredShop} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };}
;

export default Shop;
