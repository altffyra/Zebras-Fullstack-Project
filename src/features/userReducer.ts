import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/Interface";

const initialState: User = {name: 'qwe', email: 'asd', phoneNumber: 'asd', accountId: ''};

const setUser = createAction<User>('Set User');

const actions = { setUser };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {


        return action.payload
    }
})

export {reducer, actions}