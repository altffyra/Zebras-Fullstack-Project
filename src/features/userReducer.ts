import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/types";

const initialState: User | null = {name: '', email: '', phoneNumber: '', accountId: '', password:''};

const setUser = createAction<User>('Set User');
const logOut = createAction('Login');

const setGuest = createAction('Set Guest');


const actions = { setUser, setGuest, logOut };

const reducer = createReducer(initialState, {
    [setUser.toString()]: (state, action) => {
        return action.payload
    }, 
    [logOut.toString()]: (state, action) => {

        return initialState
    },    
    [setGuest.toString()]: (state, action) => {
        state.accountId= "guest"
        return state
    },



})

export {reducer, actions}