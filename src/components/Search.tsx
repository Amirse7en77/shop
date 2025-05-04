import React, { FC, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useProductFilters } from "./customHooks/FilterParams";
import { useDebounce } from "./customHooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQuery } from "@/slice/filteredShopSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from './Product';

interface IProps {};

const Search: FC<IProps> = () => {
    const { search, handleFilter } = useProductFilters();
    const [inputValue, setInputValue] = useState(search ?? "");
    const debouncedSearch = useDebounce(inputValue, 500);
const dispatch=useDispatch()
    
 const {data,isSuccess}=useQuery({
    queryKey:['product',search],
    queryFn:()=>axios.get(`https://dummyjson.com/products/search?q=${search}`)
 })
 if(isSuccess){
    dispatch(setFilterQuery(data.data.products))
 }

    // Handle debounced filter updates
    useEffect(() => {
        handleFilter({ search: debouncedSearch });
    
    }, [debouncedSearch, handleFilter]);

    return (
        <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                    value={inputValue ?? ""}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-[500px]" 
                    placeholder="Search" 
                />
            </div>
        </div>
    );
};

export default Search;