import { combineReducers } from 'redux';

import userReducer from './user';
import eventsReducer from './events';

export default combineReducers({
    user: userReducer,
    events: eventsReducer,
})