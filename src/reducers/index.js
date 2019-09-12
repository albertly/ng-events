import { combineReducers } from 'redux';

import userReducer from './user';
import eventsReducer from './events';
import paymentReducer from './payment';


export default combineReducers({
    user: userReducer,
    events: eventsReducer,
    payment: paymentReducer,
})