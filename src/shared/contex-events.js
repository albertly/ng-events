import React, {useReducer} from 'react';

import axios from 'axios';


const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

const GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

const SAVE_EVENT_SUCCESS = "SAVE_EVENT_SUCCESS";
const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';

const ADD_VOTER_SUCCESS = "ADD_VOTER_SUCCESS";
const ADD_VOTER_FAILURE = 'ADD_VOTER_FAILURE';

const DELETE_VOTER_SUCCESS = "ADD_VOTER_SUCCESS";
const DELETE_VOTER_FAILURE = 'ADD_VOTER_FAILURE';

const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

const EventsContext = React.createContext();


const initialState = {events:[], currentEvent:{}, errorMessage:''};

const reducer = (state, action) => {

    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return {...state, currentEvent:{}, events: action.payload, errorMessage: ''};

        case SAVE_EVENT_SUCCESS:

            return {...state, currentEvent:{}, events: state.events.concat(action.payload), errorMessage: ''}

        case GET_EVENT_SUCCESS:
            console.log(GET_EVENT_SUCCESS, action.payload);
            return  {...state, currentEvent: action.payload, errorMessage: ''};

        case DELETE_VOTER_SUCCESS:
        case ADD_VOTER_SUCCESS:
            let newEvent;
            const newEvents = state.events.map(event => {
                if (event.id === action.eventId) {
                     newEvent = {...event, sessions: event.sessions.map(session => {
                        if (session.id === action.sessionId) {
                            return action.session;
                        } else {
                            return session;
                        }
                    })
                  }
                  return newEvent;
                } else {
                    return event;
                }
            })

            return {...state, events: newEvents, currentEvent: newEvent, errorMessage: ''};

        case ADD_VOTER_FAILURE:
        case DELETE_VOTER_FAILURE:
        case GET_EVENT_FAILURE:
        case SAVE_EVENT_FAILURE:
        case GET_EVENTS_FAILURE:
             return {...state, currentEvent:{}, errorMessage: action.error}

        default:
            return state;
    }
};

const voteAction = async (dispatch, eventId, sessionId, voterId, action) => {
    let response = {};
    const url = `/api/events/${eventId}/sessions/${sessionId}/voters/${voterId}`;
    try {
        if (action === 'add') {
            response = await axios.post(url);
            dispatch({type: ADD_VOTER_SUCCESS, eventId, sessionId, session: response.data});
        } else {
            response = await axios.delete(url);
            dispatch({type: ADD_VOTER_SUCCESS, eventId, sessionId, session: response.data});
        }
    }
    catch(ex) {
        if (action === 'add') {
            dispatch({type: ADD_VOTER_FAILURE, error: 'Add Vote Error'});
        } else {
            dispatch({type: DELETE_VOTER_FAILURE, error: 'Delete Vote Error'});
        }
    }
}

const getEventAction = async (dispatch, eventId) => {
    let response = {};
    try {
        response = await axios.get(`/api/events/${eventId}`);
        console.log('response', response);
        dispatch({type: GET_EVENT_SUCCESS, payload: response.data});
    }
    catch(ex) {
        console.log('ex', ex);
        return await dispatch({type: GET_EVENT_FAILURE, error: 'Get Event Error'});
    }
}

const saveEventAction = async (dispatch, event) => {
    let response = {};
    try {
        response = await axios.post('/api/events', event);
        dispatch({type: SAVE_EVENT_SUCCESS, payload: response.data});
    }
    catch(ex) {
        dispatch({type: SAVE_EVENT_FAILURE, error: 'Save Event Error'});
    }
}

const getEventsAction = async (dispatch) => {
    let response = {};
    try {
        response = await axios.get('/api/events');
        dispatch({type: GET_EVENTS_SUCCESS, payload: response.data});
    }
    catch(ex) {
        dispatch({type: GET_EVENTS_FAILURE, error: 'Get Events Error'});
    }
}

function ContextEventsProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };
    
    return (
      <EventsContext.Provider value={value}>{props.children}</EventsContext.Provider>
    );
}


export { 
        EventsContext,
        ContextEventsProvider,
        getEventsAction,
        saveEventAction,
        getEventAction,
        voteAction
       };