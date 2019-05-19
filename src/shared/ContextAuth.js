import React, {useReducer} from 'react';

const AUTH_USER = 'AUTH_USER';
const AuthContext = React.createContext();

const initialState = {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
}

const reducer = (state, action) => {

    switch (action.type) {
        case AUTH_USER:
        return  {...state,
            userName:action.userName,
            firstName: 'John',
            lastName: 'Papa'
            }
        default:
            return state;
    }
 
};

function isAuthenticated() {
    return !!AuthContext.state.userName;
}

function ContextAuthProvider(props) {

    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };
  
    return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
  }

  const AuthContextConsumer = AuthContext.Consumer;

  export { AuthContext, ContextAuthProvider, AuthContextConsumer, isAuthenticated, AUTH_USER };