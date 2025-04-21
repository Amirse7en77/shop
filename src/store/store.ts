import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../slice/cartSlice';
import filteredShopReducer from './../slice/filteredShopSlice'

export const store=configureStore({
    reducer:{cart:cartReducer,filteredShop:filteredShopReducer}
})