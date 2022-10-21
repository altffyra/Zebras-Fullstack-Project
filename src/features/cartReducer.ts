import { createAction, createReducer } from "@reduxjs/toolkit";
import CartItem from "../components/CartItem";
import { CartProps, CartItems } from "../models/types";

const initialState: CartProps = {
    cartItems: [
        // {name:"1", price: 1, amount: 1},
        // {name:"2", price: 1, amount: 1},
        // {name:"3", price: 1, amount: 1},
        // {name:"4", price: 1, amount: 1},
        // {name:"5", price: 1, amount: 1},
        // {name:"6", price: 1, amount: 1},
        // {name:"7", price: 1, amount: 1},
        // {name:"8", price: 1, amount: 1},
        // {name:"9", price: 1, amount: 1},
        // {name:"10", price: 1, amount: 1},
        // {name:"11", price: 1, amount: 1},
        // {name:"12", price: 1, amount: 1},
        // {name:"13", price: 1, amount: 1}
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
// I cart hämta tempOrder, om den finns längd 1, så lägg till en knappp för avbryt
// kanppen dispatchar töm temporder
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
    }
})

export {reducer, actions}