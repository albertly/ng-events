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
