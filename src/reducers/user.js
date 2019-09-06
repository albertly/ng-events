import * as actions from '../actions/types';

const initialState = {
    id: 0,
    email: sessionStorage.getItem('email'),
    userName: sessionStorage.getItem('userName'),
    firstName: sessionStorage.getItem('firstName'),
    lastName: sessionStorage.getItem('lastName'),
    token: sessionStorage.getItem('token'),
    roles: sessionStorage.getItem('roles'),
    errorMessage: '',
    loading: false,
    actionState: 0
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_GOOGLE_START:
        case actions.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actions.SET_USER_ACTION_STATE:
                return { ...state, actionState: action.payload };    

        case actions.AUTH_GOOGLE_SUCCESS:    
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                errorMessage: '',
                loading: false,
            }
        case action.SIGNUP_USER_START:
        case actions.UPDATE_USER_START:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                actionState: 1
            }
        case actions.UPDATE_USER_FAILURE:
                return {
                    ...state,
                    errorMessage: action.error,
                    loading: false,
                    actionState: 2
                }
        case actions.SIGNUP_USER_FAILURE:
        case actions.AUTH_GOOGLE_FAILURE:    
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
                errorMessage: '',
                loading: false,
                actionState: 2
            }
            case actions.SIGNUP_USER_SUCCESS:
                    return {
                        ...state,
                        ...action.payload,
                        errorMessage: '',
                        loading: false,
                    }
        case actions.LOGOFF_USER:
            return {
                ...state,
                email: '',
                firstName: '',
                lastName: '',
                userName: '',
                roles: '',
                token: ''
            }
        default:
            return state;
    }
};

export default userReducer;