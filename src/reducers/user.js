import * as actions from '../actions/types';

const initialState = {
    id: 6,
    userName: '',
    firstName: '',
    lastName: '',
    errorMessage: '',
    loading: false,
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actions.AUTH_SUCCESS:
            console.log('AUTH_SUCCESS', action.payload);
            return {
                ...state,
                ...action.payload,
                errorMessage: '',
                loading: false,
            }
        case actions.UPDATE_USER_START:
            return {
                ...state,
                loading: true,
            }
        case actions.UPDATE_USER_FAILURE:
        case actions.AUTH_FAILURE:
            return {
                ...state,
                errorMessage: action.error,
                loading: false,
            }
        case actions.UPDATE_USER_SUCCESS:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                loading: false,
            }
        default:
            return state;
    }
};

export default userReducer;