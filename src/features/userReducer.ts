import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/types";

const initialState: User | null = {name: 'arne', email: 'arenee', phoneNumber: '11010', accountId: 'dacs', password:'dada'};

const setUser = createAction<User>('Set User');

const actions = { setUser };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {

        return action.payload
    }
})

export {reducer, actions}