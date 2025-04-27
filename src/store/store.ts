import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../slice/cartSlice';
import filteredShopReducer from './../slice/filteredShopSlice'
import userReducer from './../slice/userSlice'

export const store=configureStore({
    reducer:{cart:cartReducer,filteredShop:filteredShopReducer,user:userReducer}
})