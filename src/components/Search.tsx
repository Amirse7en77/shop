import React, { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQuery } from "@/slice/filteredShopSlice";


interface IProps {};

const Search:FC<IProps> = (props) => {
    
    const dispatch=useDispatch()
    const query=useSelector(state=>state?.filteredShop.query)


    const handleSearch=(e)=>{
        const value=(e.target.value)
        
        dispatch(setFilterQuery(value))

    }
    

    return <div>
                <div className="flex w-full max-w-sm items-center space-x-2">
        <Input value={query} onChange={handleSearch} className='w-[500px]' placeholder="Search" />
        
        </div>
        <div className="flex justify-center items-center"></div>
    </div>
};

export default Search;