import { createAction, createReducer } from "@reduxjs/toolkit";
import { Cart, MenuItems } from "../models/Interface";

const initialState: Cart[] = [];

const addToCart = createAction<MenuItems>('Add To Cart');

const actions = { addToCart };

const reducer = createReducer(initialState, {
    [addToCart.toString()]: (state, action) => {


        return state
    },
})

export {reducer, actions}