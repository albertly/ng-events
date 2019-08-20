import axios from 'axios';

import * as actions from './types';

export const setActionState = (actionState) => ({
    type: actions.SET_ACTION_STATE,
    payload : actionState
});

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

//////////////////////////////////////////////////
export const deleteEvent = (eventId) => {
    return (dispatch, getState) => {
        dispatch(deleteEventStarted());

        const config = { headers: { authorization: getState().user.token,}};
        axios.delete(`/api/events/${eventId}`, config)
            .then(res => {
                dispatch(deleteEventSuccess(res.data));
            })
            .catch(err => {
                dispatch(deleteEventFailure(err.message));
            });
    }
}

const deleteEventStarted = () => ({
    type: actions.DELETE_EVENT_START
});

const deleteEventSuccess = payload => ({
    type: actions.DELETE_EVENT_SUCCESS,
    payload,
});

const deleteEventFailure = error => ({
    type: actions.DELETE_EVENT_FAILURE,
    error
});
//////////////////////////////////////////////////
export const voteAction =  (eventId, sessionId, voterId, action) => {
    return (dispatch, getState) => {
        dispatch(voteActionStarted()); 

        const config = { headers: { authorization: getState().user.token,}};
        const url = `/api/events/${eventId}/sessions/${sessionId}/voters/${voterId}`;

        let axiosVerb = axios.delete;
        let data = [url, config];
        if (action === 'add') {
            axiosVerb = axios.post;
            data = [url, {}, config];
        }
        
        axiosVerb.apply(null, data)
            .then(res => {
                dispatch(voteActionSuccess(eventId, sessionId, res.data));
            })
            .catch(err => {
                dispatch(voteActionFailure(err.message));
            });
    }
}

const voteActionStarted = () =>  ({
    type: actions.VOTER_ACTION_START
});

const voteActionSuccess = (eventId, sessionId, session) => ({
    type: actions.VOTER_ACTION_SUCCESS,
    eventId,
    sessionId,
    session
});

const voteActionFailure = error => ({
    type: actions.VOTER_ACTION_FAILURE,
    error
});

/////////////////////////////////
export const addSession =  (event, session) => {
    const nextId = Math.max.apply(null, event.sessions.map(s => s.id));
    session.id = nextId + 1;
    session.voters = [];
    event.sessions.push(session);
    return saveEvent(event, 'Save Session Error: ');
}

export const saveEvent =  (event, msg = 'Save Event Error: ') => {
    return (dispatch, getState) => {
        dispatch(saveEventStarted());

        const config = { headers: { authorization: getState().user.token,}};
        axios.post('/api/events', event, config)
            .then(res => {
              dispatch(saveEventSuccess(res.data));
            })
            .catch(err => {
               dispatch(saveEventFailure(msg + err));
            });
    }
}

const saveEventStarted = () =>  ({
    type: actions.SAVE_EVENT_START
});

const saveEventSuccess = payload => ({
    type: actions.SAVE_EVENT_SUCCESS,
    payload,
});

const saveEventFailure = error => ({
    type: actions.SAVE_EVENT_FAILURE,
    error
});

///////////////////////////
export const searchSessionsAction = async (search) => {
    let response = {};
    try {
        response = await axios.get(`/api/sessions/search?search=${search}`);
        console.log(response);
        return response.data;
    }
    catch(ex) {
        return {};
    }
}