import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItem:[],
};

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers: {
        addCartItem:(state=[],action)=>{
            const check=state.cartItem.some((el)=>el._id===action.payload._id)
            if(check){
                alert("Already Item is in cart")
            }
            else{
                alert("item added sucessfully")
                state.cartItem=[...state.cartItem,{...action.payload}]
            }

        },
       
        
    },
})
export const {
    addCartItem,
   
}=productSlice.actions

export default productSlice.reducer