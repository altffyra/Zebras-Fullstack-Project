import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/types";

const initialState: User | null = {name: '', email: '', phoneNumber: '', accountId: '', password:''};

const setUser = createAction<User>('Set User');

const actions = { setUser };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {

        return action.payload
    }
})

export {reducer, actions}