import { createAction, createReducer } from "@reduxjs/toolkit";
import { CartProps, CartItems } from "../models/types";

const initialState: CartProps = {
    cartItems: [
        {name:"1", price: 1, amount: 1},
        {name:"2", price: 2, amount: 1},
        {name:"3", price: 3, amount: 1},
        {name:"4", price: 4, amount: 1},
    //     {name:"5", price: 5, amount: 1},
    //     {name:"6", price: 6, amount: 1},
    //     {name:"7", price: 4, amount: 1},
    //     {name:"8", price: 5, amount: 1},
    //     {name:"9", price: 6, amount: 1},
    //     {name:"10", price: 4, amount: 1},
    //     {name:"11", price: 5, amount: 1},
    //     {name:"12", price: 6, amount: 1},
    //     {name:"13", price: 7, amount: 1}
    ],
    totalPrice: 0
};

type UpdatedCartItem = {
    name: string;
    amount: number
}

const addToCart = createAction<CartItems>('Add To Cart');
const updateAmount = createAction<UpdatedCartItem>('Update amount')
const changeOrder = createAction<CartProps>('Update order')

const actions = { addToCart, updateAmount, changeOrder };

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
        
        state.totalPrice = updatedPrice;
        state.cartItems = cartCopy;        
        
        return state
    },
    [changeOrder.toString()]: (state, action) => {


        return action.payload
    }
})

export {reducer, actions}