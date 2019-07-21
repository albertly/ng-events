import * as actions from '../actions/types';

const initialState = {
    id: 6,
    userName: sessionStorage.getItem('userName'),
    firstName: sessionStorage.getItem('firstName'),
    lastName: sessionStorage.getItem('lastName'),
    token: sessionStorage.getItem('token'),
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
        case actions.LOGOFF_USER:
            return {
                ...state,
                firstName: '',
                lastName: '',
                userName: '',
                token: ''
            }
        default:
            return state;
    }
};

export default userReducer;