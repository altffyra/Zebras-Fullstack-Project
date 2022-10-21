import { createAction, createReducer } from "@reduxjs/toolkit";
import { Order } from "../models/types";

const initialState: Order[] | null = [];

const setTempOrder = createAction<Order>('Set temp order');
const clearTempOrder = createAction('Clear temp order');

const actions = { setTempOrder };

const reducer = createReducer(initialState, {
    [setTempOrder.toString()]: (state, action) => {
        const tempOrder: Order[] = [action.payload]

        return tempOrder
    },
    [setTempOrder.toString()]: (state, action) => {
    
        return initialState
    }

})

export {reducer, actions}