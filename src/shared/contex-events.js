import React, {useReducer} from 'react';

import axios from 'axios';

import Events from './events';

const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';
const SAVE_EVENT_SUCCESS = "SAVE_EVENT_SUCCESS";
const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

const EventsContext = React.createContext();


const initialState = [...Events()];

const reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            console.log(GET_EVENTS_SUCCESS);
            return  state;

        case SAVE_EVENT_SUCCESS:
            action.event.id = 999;
            action.event.session = [];
            return state.concat(action.event);

        default:
            return state;
    }
};


function ContextEventsProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };
    
    return (
      <EventsContext.Provider value={value}>{props.children}</EventsContext.Provider>
    );
}


export { EventsContext, ContextEventsProvider };