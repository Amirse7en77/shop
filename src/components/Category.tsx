import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useProductFilters } from "./customHooks/FilterParams";
  

interface IProps extends object {};

const Category:FC<IProps> = () => {
  const{category,handleFilter}=useProductFilters()
  
    const {data,isSuccess}=useQuery({
        queryKey:['category'],
        queryFn:()=>axios.get('https://dummyjson.com/products/categories')
      })
      if(isSuccess){
        console.log(data.data)
      }
    return <div>
        <Select >
  <SelectTrigger className="w-[180px]" onValueChange={(value) => handleFilter({ category: value })}>
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent className="w-[180px] h-[200px] overflow-y-auto">
  {data?.data.map((item: string | { slug: string }) => {
    const value = typeof item === 'string' ? item : item.slug;
    return <SelectItem  key={value} value={value}>{value}</SelectItem>;
  })}
  </SelectContent>
</Select>
    </div>
};

export default Category;