import { createAction, createReducer } from "@reduxjs/toolkit";
import { Order } from "../models/types";

const initialState: Order[] = [
    // {
    //   cart: {
    //     cartItems: [
    //       {name: "Imaginary", "price": 100, "amount": 1},
    //       {name: "Imaginary Igen", "price": 10, "amount": 3},
    //       {name: "Något", "price": 10, "amount": 1},
    //       {name: "Något Igen", "price": 50, "amount": 1}
    //     ], 
    //     totalPrice: 190
    //   },
    //   user: { 
    //     name: "Imaginary",
    //     email: "Imaginary@fake.com",
    //     accountId: "uaidy89hdaskd",
    //     phoneNumber: "070423502"
    //   },
  
    //   userComment: "Tål inte saker",
    //   adminComment: "Ge vatten bara",
    //   locked: true,
    //   completed: true,
    //   orderCompleted: "2022-04-17 22:45",
    //   orderPlaced: "2022-04-17 22:15",
    //   id:"asd"
    // },
    // {
    //   cart: {
    //     cartItems: [
    //       {name: "Imaginary", "price": 100, "amount": 1},
    //       {name: "Imaginary Igen", "price": 10, "amount": 3},
    //       {name: "Något", "price": 10, "amount": 1},
    //       {name: "Något Igen", "price": 50, "amount": 1}
    //     ], 
    //     totalPrice: 190
    //   },
    //   user: { 
    //     name: "Imaginary",
    //     email: "Imaginary@fake.com",
    //     accountId: "uaidy89hdaskd",
    //     phoneNumber: "070423502"
    //   },
  
    //   userComment: "Tål inte saker",
    //   adminComment: "Ge vatten bara",
    //   locked: false,
    //   completed: false,
    //   orderCompleted: "2022-04-17 22:45",
    //   orderPlaced: "2022-04-17 22:15",
    //   id:"123"
    // },
      
];

const getOrders = createAction<Order[]>('Get all orders');
const clearOrders = createAction('Clear orders');

const actions = { getOrders, clearOrders };

const reducer = createReducer(initialState, {
    [getOrders.toString()]: (state, action) => {
        const allOrders = [...action.payload];

        return allOrders
    },
    [clearOrders.toString()]: (state, action) => {

      return initialState
  }
})

export {reducer, actions}