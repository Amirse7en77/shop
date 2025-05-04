import React, { FC, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useProductFilters } from "./customHooks/FilterParams";
import { useDebounce } from "./customHooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQuery } from "@/slice/filteredShopSlice";


interface IProps {};

const Search: FC<IProps> = () => {
    const { search, handleFilter } = useProductFilters();
    const [inputValue, setInputValue] = useState(search ?? "");
    const debouncedSearch = useDebounce(inputValue, 500);
const dispatch=useDispatch()

 

    // Handle debounced filter updates
    useEffect(() => {
        handleFilter({ search: debouncedSearch });
        dispatch(setFilterQuery(inputValue))
    }, [debouncedSearch, handleFilter,inputValue]);

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