import { decreaseItem, getTotals, increaseItem } from "@/slice/cartSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {};

const Cart:FC<IProps> = (props) => {
    
   
    const cart=useSelector(state=>state?.cart)
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    
    const handleIncreaseItem=(id)=>{
        
        dispatch(increaseItem(id))
    }
    const handleDecreaseItem=(id)=>{
        dispatch(decreaseItem(id))
    }
    return <div>
        <div className="mx-4">
  {/* Header */}
  <h2 className="text-3xl font-bold mb-6">Shopping Basket ({cart.cartTotalQty})</h2>

  {/* Basket Items Grid */}

    {/* Item 1 */}
   
    
    {Object.values(cart.entities).map(product=>(
          <div >
         <div className="bg-sky-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-10">
         <div>
           <div >
             <img 
               src={product.thumbnail}
               alt="Product name"
               className="   rounded-lg"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
               }}
             />
           </div>
           <div className="col-span-8 ">
             <h3 className="font-semibold mb-1">{product.title}</h3>
             <p className="text-sm text-gray-600 mb-2">Size: Medium</p>
             <div className="flex items-center justify-between ">
               <div className="flex items-center gap-2 ">
                 <button onClick={()=>handleDecreaseItem(product.id)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
                   -
                 </button>
                 <span>{product.cartTotalQty}</span>
                 <button onClick={()=>handleIncreaseItem(product.id)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
                   +
                 </button>
               </div>
               <p className="font-semibold">${product.cartTotalAmount.toFixed(2)}</p>
             </div>
           </div>
         </div>
       </div>
       </div>
    ))}
    
   


  

  {/* Totals Section */}
  <div className="mt-8 p-6 bg-gray-50 rounded-lg mb-10">
    <div className="space-y-3">
      
      <div className="flex justify-between text-lg font-bold">
        <span>Total:{cart.cartTotalQty}</span>
        <span>${cart.cartTotalAmount.toFixed(2)}</span>
      </div>
    </div>

    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
      Proceed to Checkout
    </button>
  </div>
</div>
    </div>
};

export default Cart;
