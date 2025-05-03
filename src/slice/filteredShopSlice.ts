import { createSlice } from "@reduxjs/toolkit";


const filteredShopSlice = createSlice({
    name: 'filteredShop',
    initialState: {
      query: '',
      
    },
    reducers: {
      setFilterQuery: (state, action) => {
        state.query = action.payload;
      },
     setCategoryQuery:(state,action)=>{
      state.query=action.payload
     }
    }
  });
  export const{setFilterQuery,setCategoryQuery}=filteredShopSlice.actions
  export default filteredShopSlice.reducer