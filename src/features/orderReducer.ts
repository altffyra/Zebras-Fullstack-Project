import { createAction, createReducer } from "@reduxjs/toolkit";
import { Order } from "../models/types";

const initialState: Order[] = [];

const getOrders = createAction<Order[]>("Get all orders");
const clearOrders = createAction("Clear orders");
const makeOrders = createAction<Order>("Make order");
const deleteOrder = createAction<string>("Delete order");

const actions = { getOrders, clearOrders, makeOrders, deleteOrder };

const reducer = createReducer(initialState, {
  [getOrders.toString()]: (state, action) => {
    const allOrders = [...action.payload];

    return allOrders;
  },
  [clearOrders.toString()]: (state, action) => {
    return initialState;
  },
  [makeOrders.toString()]: (state, action) => {
    const allOrders = [action.payload];

    return allOrders;
  },
  [deleteOrder.toString()]: (state, action) => {
    const orderCopy: Order[] = [...state];
    const filteredArr: Order[] = orderCopy.filter(
      (order) => order.id !== action.payload
    );

    return filteredArr;
  },
});

export { reducer, actions };
