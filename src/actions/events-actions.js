import axios from 'axios';

import * as actions from './types';

export const getEvents = () => {
    return dispatch => {
        dispatch(getEventsStarted());
        axios.get('/api/events')
            .then(res => {
                dispatch(getEventsSuccess(res.data));
            })
            .catch(err => {
                dispatch(getEventsFailure(err.message));
            });
    }
}

const getEventsStarted = () => ({
    type: actions.GET_EVENTS_START
});

const getEventsSuccess = payload => ({
    type: actions.GET_EVENTS_SUCCESS,
    payload,
});

const getEventsFailure = error => ({
    type: actions.GET_EVENTS_FAILURE,
    error
});

//////////////////////////////////////
export const getEvent = (eventId) => {
    return dispatch => {
        dispatch(getEventStarted());
        axios.get(`/api/events/${eventId}`)
            .then(res => {
                dispatch(getEventSuccess(res.data));
            })
            .catch(err => {
                dispatch(getEventFailure(err.message));
            });
    }
}

const getEventStarted = () => ({
    type: actions.GET_EVENT_START
});

const getEventSuccess = payload => ({
    type: actions.GET_EVENT_SUCCESS,
    payload,
});

const getEventFailure = error => ({
    type: actions.GET_EVENT_FAILURE,
    error
});