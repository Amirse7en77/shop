import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilters } from "./customHooks/FilterParams";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryQuery } from "@/slice/filteredShopSlice";
import { q } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

interface IProps extends object {}

const Category: FC<IProps> = () => {
  const { category, handleFilter } = useProductFilters();
  const [filteredCategory, setFilteredCategory] = useState("allCategories");

  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.filteredShop.query);

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("https://dummyjson.com/products/category-list"),
  });
  const {
    data: categoryData,
    isSuccess: isSuccessCategory,
    isLoading,
  } = useQuery({
    queryKey: ["category", category],
    queryFn: () =>
      axios.get(`https://dummyjson.com/products/category/${filteredCategory}`),
  });
  const { data: allProduct, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`https://dummyjson.com/products`),
  });

  useEffect(() => {
    if (filteredCategory === "allCategories") {
      {
        dispatch(setCategoryQuery(allProduct?.data?.products));
      }
    } else {
      dispatch(setCategoryQuery(categoryData?.data?.products));
    }
  }, [filteredCategory]);

  if (isLoading) {
    return (
      <div className="mt-3">
        <h1>...Loading</h1>
      </div>
    );
  }

  const handleValueChange = (value: string) => {
    setFilteredCategory(value);
    handleFilter({ category: value });
  };

  return (
    <div>
      <Select value={filteredCategory} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[180px] h-[200px] overflow-y-auto">
          <SelectItem value="allCategories">All Categories</SelectItem>
          {data?.data?.map(
            (
              item: string // Note: The API returns an array of strings
            ) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Category;
