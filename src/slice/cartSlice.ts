import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  cartTotalQty: 0,
  cartTotalAmount: 0,
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.entities[action.payload.id];
      if (existItem) {
        existItem.cartQty++;
        existItem.cartTotalQty = existItem.cartQty;
        existItem.cartTotalAmount = existItem.cartQty * existItem.price;
        state.cartTotalQty++;
      } else {
        cartAdapter.addOne(state, {
          ...action.payload,
          cartQty: 1,
          cartTotalQty: 1,
          cartTotalAmount: action.payload.price
        });
        state.cartTotalQty++;
      }
      localStorage.setItem("cart", JSON.stringify(state.entities));
    },
    getTotals: (state) => {
      let { total, qty } = Object.values(state.entities).reduce(
        (cartTotal, cartItem) => {
          
          const { price, cartQty } = cartItem;
          const itemTotal = price * cartQty;
          cartItem.cartTotalQty = cartQty;
          cartItem.cartTotalAmount = itemTotal;
          cartTotal.total += itemTotal;
          cartTotal.qty += cartQty;
          return cartTotal;
        },
        { total: 0, qty: 0 }
      );
      state.cartTotalQty = qty;
      state.cartTotalAmount = total;
      
    },
    increaseItem:(state,action)=>{
      const existItem=state.entities[action.payload]
      
      existItem.cartQty++
    },
   decreaseItem(state, action) {
               const existItem=state.entities[action.payload]
               console.log(action.payload)
   
               if (existItem.cartQty > 1) {
                   existItem.cartQty -= 1;
   
                  
               } else if (existItem.cartQty === 1) {
                    cartAdapter.removeOne(state,action.payload)
  }
},
}});

export const { addToCart, getTotals,increaseItem,decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;