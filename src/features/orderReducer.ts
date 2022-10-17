import { createAction, createReducer } from "@reduxjs/toolkit";
import { Order } from "../models/Interface";

const initialState: Order[] = [];

const getOrders = createAction<Order[]>('Get all orders');

const actions = { getOrders };

const reducer = createReducer(initialState, {
    [getOrders.toString()]: (state, action) => {
        const allOrders = [...action.payload];

        return allOrders
    }
})

export {reducer, actions}