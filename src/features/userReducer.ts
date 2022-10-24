import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/types";

const initialState: User | null = {name: '', email: '', phoneNumber: '', accountId: '', password:''};

const setUser = createAction<User>('Set User');
const setGuest = createAction('Set Guest');


const actions = { setUser, setGuest };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {
        return action.payload
    },
    
    [setGuest.toString()]: (state, action) => {
        state.accountId= "guest"
        return state
    },



})

export {reducer, actions}