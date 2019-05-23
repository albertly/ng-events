import React, {useReducer} from 'react';
// ToDo: Async
const AUTH_USER = 'AUTH_USER';
const AUTH_UPDATE_USER = 'AUTH_UPDATE_USER';
const AuthContext = React.createContext();

const initialState = {
    id: 0,
    userName: '',
    firstName: 'John',
    lastName: 'Papa',
    isAuthenticated : function(){return !!this.userName}
}

const reducer = (state, action) => {
    switch (action.type) {
        case AUTH_USER:
            return  {...state,
                userName:action.userName,
                }
        case AUTH_UPDATE_USER:
            return  {...state,
                firstName: action.firstName,
                lastName: action.lastName,
                }        
        default:
            return state;
    }
};

function ContextAuthProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };

    return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
  }

  const AuthContextConsumer = AuthContext.Consumer;

  export { AuthContext, ContextAuthProvider, AuthContextConsumer, AUTH_USER, AUTH_UPDATE_USER };