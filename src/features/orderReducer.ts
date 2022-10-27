import { createAction, createReducer } from "@reduxjs/toolkit";
import { Order } from "../models/types";

const initialState: Order[] = [];

const getOrders = createAction<Order[]>("Get all orders");
const clearOrders = createAction("Clear orders");
const makeOrders = createAction<Order>("Make order");

const actions = { getOrders, clearOrders, makeOrders };

const reducer = createReducer(initialState, {
  [getOrders.toString()]: (state, action) => {
    const allOrders = [...action.payload];

    return allOrders;
  },
  [clearOrders.toString()]: (state, action) => {
    return initialState;
  },
  [makeOrders.toString()]: (state, action) => {
    console.log(action.payload.user);

    const allOrders = [action.payload];

    return allOrders;
  },
});

export { reducer, actions };
