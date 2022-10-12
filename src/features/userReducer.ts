import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models/Interface";

const initialState: User = {name: '', email: '', phoneNumber: '', accountId: ''};

const actions = { };

const reducer = createReducer(initialState, {

})

export {reducer, actions}