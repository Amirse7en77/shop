
import  { FC } from "react";

import { useSelector } from "react-redux";
import InfiniteScrollComponent from "@/components/InfiniteScrollComponent";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Category from "@/components/Category";






interface IProps {}

const Shop: FC<IProps> = (props) => {

  const query = useSelector((state) => state?.filteredShop.query);

  

  // ... rest of the code

  return (
    <div>
      <Category/>

      <AnimatePresence>
       
       
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InfiniteScrollComponent filteredProduct={query} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Shop;
