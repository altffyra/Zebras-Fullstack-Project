import { combineReducers } from "redux";
import { reducer as cartReducer } from './cartReducer';
import { reducer as orderReducer } from './orderReducer';
import { reducer as userReducer } from './userReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    cart: cartReducer,
    user: userReducer
});

export { rootReducer };