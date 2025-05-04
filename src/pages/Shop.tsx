import { FC } from "react";

import { useSelector } from "react-redux";
import InfiniteScrollComponent from "@/components/InfiniteScrollComponent";
import { motion, AnimatePresence } from "framer-motion";

import Category from "@/components/Category";

interface IProps {}

const Shop: FC<IProps> = (props) => {
  const products = useSelector((state: any) =>
    Array.isArray(state?.filteredShop?.query) ? state.filteredShop.query : []
  );
  const inputValue = useSelector((state: any) =>
    state?.filteredShop?.search.toLowerCase()
  );

  const filteredProducts = products.filter(product =>
    JSON.stringify(product).toLowerCase().includes(inputValue)
  );

  return (
    <div>
      <Category />
      {products.length === 0 ? (
        <div>There is no Product</div>
      ) : (
        <div className="flex justify-center items-center">
          {" "}
          
        </div>
      )}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InfiniteScrollComponent filteredProduct={filteredProducts} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Shop;
