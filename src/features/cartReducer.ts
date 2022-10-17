import { createAction, createReducer } from "@reduxjs/toolkit";
import { CartProps, CartItems } from "../models/Interface";

const initialState: CartProps = {
    cartItems: [
        {name:"1", price: 1, amount: 1},
        {name:"2", price: 2, amount: 1},
        {name:"3", price: 3, amount: 1},
        {name:"4", price: 4, amount: 1},
        {name:"5", price: 5, amount: 1},
        {name:"6", price: 6, amount: 1},
        {name:"7", price: 7, amount: 1}
    ],
    totalPrice: 28
};

type UpdatedCartItem = {
    name: string;
    amount: number
}

const addToCart = createAction<CartItems>('Add To Cart');
const updateAmount = createAction<UpdatedCartItem>('Update amount')

const actions = { addToCart, updateAmount };

const reducer = createReducer(initialState, {
    [addToCart.toString()]: (state, action) => {


        return state
    },
    [updateAmount.toString()]: (state, action) => {
        
        let cartCopy: CartItems[] = [...state.cartItems]; 
        let updatedPrice: number = state.totalPrice;

        cartCopy.forEach(item => {
            if(item.name == action.payload.name) {
                updatedPrice = updatedPrice - (item.price * item.amount)
                item.amount = action.payload.amount;
                updatedPrice = updatedPrice + (item.price * item.amount)
            }
            if(item.amount == 0) {
                cartCopy = cartCopy.filter(item => item.amount != 0);
            } 
        })
        
        console.log(cartCopy);
        
        state.totalPrice = updatedPrice;
        state.cartItems = cartCopy;
        
        
        return state
    }
})

export {reducer, actions}