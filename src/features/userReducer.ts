import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/Interface";

const initialState: User = {name: '', email: '', phoneNumber: '', accountId: ''};

const setUser = createAction<User>('Set User');

const actions = { setUser };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {

        return action.payload
    }
})

export {reducer, actions}