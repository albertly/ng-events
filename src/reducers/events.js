import * as actions from '../actions/types';

const initialState = {
    events: [],
    currentEvent: {},
    errorMessage: '',
    loading: false,
};

const eventsReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.GET_EVENTS_SUCCESS:
            return { ...state, events: action.payload, errorMessage: '', loading: false };

        case actions.GET_EVENTS_START:
            return { ...state, errorMessage: '', loading: true };

        case actions.SAVE_EVENT_START:
                return { ...state, errorMessage: '', loading: true }

        case actions.SAVE_EVENT_SUCCESS:
            console.log('SAVE_EVENT_SUCCESS')
            return { ...state, events: state.events.concat(action.payload), errorMessage: '' }

        case actions.GET_EVENT_START:
            return { ...state, currentEvent: {}, errorMessage: '', loading: true };

        case actions.GET_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload, errorMessage: '', loading: false };

        case actions.VOTER_ACTION_START:
            return { ...state, errorMessage: '', loading: true };
        case actions.VOTER_ACTION_SUCCESS:
            let newEvent;
            const newEvents = state.events.map(event => {
                if (event.id === action.eventId) {
                    newEvent = {
                        ...event, sessions: event.sessions.map(session => {
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

            return { ...state, events: newEvents, currentEvent: newEvent, errorMessage: '', loading: false };

        case actions.ADD_SESSION_FAILURE:
        case actions.VOTER_ACTION_FAILURE:
        case actions.GET_EVENT_FAILURE:
        case actions.SAVE_EVENT_FAILURE:
        case actions.GET_EVENTS_FAILURE:
            return { ...state, currentEvent: {}, errorMessage: action.error, loading: false }

        default:
            return state;
    }
};

export default eventsReducer;