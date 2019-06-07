import React, {useReducer} from 'react';

const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAILURE = 'AUTH_FAILURE';
const AUTH_UPDATE_USER = 'AUTH_UPDATE_USER';
const AuthContext = React.createContext();

const initialState = {
    id: 0,
    userName: '',
    firstName: 'John',
    lastName: 'Papa',
    errorMessage: '',
    isAuthenticated : function(){return !!this.userName}
}

const reducer = (state, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            console.log('In dispatch ', action.userName);
            return  {...state,
                userName: action.userName,
                errorMessage: ''
                }
        case AUTH_FAILURE:
            console.log('In dispatch failure ', action.error);
            return {...state,
                    errorMessage: action.error}    
        case AUTH_UPDATE_USER:
            return  {...state,
                firstName: action.firstName,
                lastName: action.lastName,
                }        
        default:
            return state;
    }
};

const AuthUser = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (userName === "user1" && password === "pass") {
        setTimeout(() => resolve(userName), 1000);
      } else {
        setTimeout(() => reject("Auth error"), 1000);
      }
    });
};

const  AuthUserAction = async (dispatch, userName, password) => {
    let authUserName = '';
    try {
        authUserName = await AuthUser(userName, password);
        await dispatch({type:AUTH_SUCCESS, userName: authUserName});
    }
    catch(ex) {
        dispatch({type: AUTH_FAILURE, error: 'Auth Error'})
    }
}

function ContextAuthProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };
    
    return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
  }

  const AuthContextConsumer = AuthContext.Consumer;

  export { AuthContext, ContextAuthProvider, AuthContextConsumer, AuthUserAction, AUTH_UPDATE_USER };