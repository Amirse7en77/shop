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
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryQuery } from "@/slice/filteredShopSlice";

interface IProps extends object {};

const Category: FC<IProps> = () => {
    const { category, handleFilter } = useProductFilters();
    const [filteredCategory, setFilteredCategory] = useState(category);
    const dispatch=useDispatch()
    const { data, isSuccess } = useQuery({
        queryKey: ['category'],
        queryFn: () => axios.get('https://dummyjson.com/products/category-list'),
    });
    const {data:categoryData,isSuccess:isSuccessCategory}=useQuery({
      queryKey: ['category',category],
        queryFn: () => axios.get(`https://dummyjson.com/products/category/${filteredCategory}`),
    })
    useEffect(()=>{
      if(isSuccessCategory){
        console.log(categoryData.data.products)
        dispatch(setCategoryQuery(categoryData.data.products))
      }
    },[categoryData])

   
   

    const handleValueChange = (value: string) => {
        setFilteredCategory(value);
        handleFilter({category: value});
        
    };

    return (
        <div>
            <Select value={filteredCategory} onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="w-[180px] h-[200px] overflow-y-auto">
                    {data?.data?.map((item: string) => ( // Note: The API returns an array of strings
                        <SelectItem value={item} key={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Category;