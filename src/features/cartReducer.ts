import { createAction, createReducer } from "@reduxjs/toolkit";
import CartItem from "../components/CartItem";
import { CartProps, CartItems } from "../models/types";

const initialState: CartProps = {
    cartItems: [],
    totalPrice: 0
};

type UpdatedCartItem = {
    name: string;
    amount: number
}

const addToCart = createAction<CartItems>('Add To Cart');
const updateAmount = createAction<UpdatedCartItem>('Update amount')
const changeOrder = createAction<CartProps>('Update order')
const clearCart = createAction('Clear Cart');

const actions = { addToCart, updateAmount, changeOrder, clearCart };

const reducer = createReducer(initialState, {
    [addToCart.toString()]: (state, action) => {

        let cartItemsCopy: CartItems[] = [...state.cartItems];
        let updatedPrice: number = state.totalPrice
        const itemPrice : number = action.payload.price

        let found: number = cartItemsCopy.findIndex(item => item.name === action.payload.name)
        if (found == -1) {                      
            cartItemsCopy.push(action.payload);
            updatedPrice = +updatedPrice + +itemPrice
        } else {
            if(cartItemsCopy[found].amount === 10) {
                return
            }
            cartItemsCopy[found].amount = cartItemsCopy[found].amount + 1          
            updatedPrice = +updatedPrice + +itemPrice 
        }
        state.totalPrice = +updatedPrice
        state.cartItems = cartItemsCopy;
        return state;
    },
    [updateAmount.toString()]: (state, action) => {
        
        let cartCopy: CartItems[] = [...state.cartItems]; 
        let updatedPrice: number = state.totalPrice;
        cartCopy.forEach(item => {
            if(item.name == action.payload.name) {
                updatedPrice = +updatedPrice - +(item.price * item.amount)
                item.amount = action.payload.amount;
                updatedPrice = +updatedPrice + +(item.price * item.amount)
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
    },
    [clearCart.toString()]: (state, action) => {


        return initialState
    }

})

export {reducer, actions}