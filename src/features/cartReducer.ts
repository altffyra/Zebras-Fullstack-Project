import { createAction, createReducer } from "@reduxjs/toolkit";
import { CartProps, MenuItems } from "../models/Interface";

const initialState: CartProps = {
    cartItems: [
    {name:"Glass med nötter", desc:"Krämig gräddglass med hackade hasselnötter och chokladsås", allergies:"Laktos, Nötter", price: 199, type:"Efterrätt", amount: 1},
    {name:"Citronstekt torsk med sesambakade grönsaker och krämig aioli", desc:"Finaste ryggfiléerna av torsk i syrlig och god citron/smörsås.", allergies:"Gluten, Laktos, Fisk, Sesamfrön", price: 349, type:"Fisk", amount: 2},
    {name:"Affogato med rostade hasselnötter", desc:"goda rostade hasselnötter med vaniljglass, extra stark kaffe och lite socker, perfekt efter huvudrätten!", allergies:"Hasselnötter, Laktos", price: 599, type:"Efterätt", amount: 3},
    {name:"Lemon curd med mandelfrags", desc:"Varva lemon curd, vaniljkräm och mandelfras i höga glas för en läcker och vacker efterrätt. Toppas med hallon och garneras med mynta.", allergies:"Mandel, Laktos", price: 599, type:"Efterätt", amount: 1},

    ],
    totalPrice: 0
};

const addToCart = createAction<MenuItems>('Add To Cart');

const actions = { addToCart };

const reducer = createReducer(initialState, {
    [addToCart.toString()]: (state, action) => {


        return state
    },
})

export {reducer, actions}