import { createAction, createReducer } from "@reduxjs/toolkit";
import { MenuItems } from "../models/types";

const initialState: MenuItems[] = [];

const getMenu = createAction<MenuItems>("Get menu");

const actions = { getMenu };

const reducer = createReducer(initialState, {
  [getMenu.toString()]: (state, action) => {
    state = action.payload;

    return state;
  },
});

export { reducer, actions };
