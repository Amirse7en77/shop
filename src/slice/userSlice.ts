import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";





const userSlice=createSlice({
name:'user',
initialState:{user:null,isAuthenticated:false},
reducers:{
    getUser:(state,action)=>{
       state.user=action.payload
       state.isAuthenticated=true
    },
    deleteUser:(state,action)=>{
        state.user=null
        state.isAuthenticated=false
    }
}
})


export const {getUser,deleteUser}=userSlice.actions
export default userSlice.reducer