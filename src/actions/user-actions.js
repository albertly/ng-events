import axios from 'axios';
import toastr from 'toastr';

import * as actions from './types';

export const logoffUser = () => {
  return dispatch => {
    sessionStorage.clear();
    dispatch({ type: actions.LOGOFF_USER });
  };
};

export const authUser = (userName, password) => {
  return dispatch => {
    dispatch(authUserStarted());

    axios.post('/api/login', { email: userName, password: password })
      .then(res => {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userName', res.data.userName);
        sessionStorage.setItem('firstName', res.data.firstName);
        sessionStorage.setItem('lastName', res.data.lastName);
        sessionStorage.setItem('roles', res.data.roles);
        dispatch(authUserSuccess(res.data));
      })
      .catch(err => {
        let errMsg = err.message;
        if (err.response.data) {
          errMsg = err.response.data;
        }
        dispatch(authUserFailure(errMsg));
      });
  };
};

const authUserStarted = () => ({
  type: actions.AUTH_START
});

const authUserSuccess = payload => ({
  type: actions.AUTH_SUCCESS,
  payload,
});

const authUserFailure = error => ({
  type: actions.AUTH_FAILURE,
  error
});
////////////////////////////
export const updateUser = (userId, firstName, lastName, history) => {
  return (dispatch, getState) => {
    dispatch(updateUserStarted());

    const config = { headers: { authorization: getState().user.token, } };

    axios.put(`/api/users/${userId}`, { id: userId, firstName: firstName, lastName: lastName }, config)
      .then(res => {
         dispatch(updateUserSuccess(res.data));
         toastr.success('Profile Saved');
         history.push('/events');
      })
      .catch(err => {
         dispatch(updateUserFailure(err.message));
         toastr.error(err.message);
      });
  };
};

const updateUserSuccess = payload => ({
  type: actions.UPDATE_USER_SUCCESS,
  payload,
});

const updateUserStarted = () => ({
  type: actions.UPDATE_USER_START
});

const updateUserFailure = error => ({
  type: actions.UPDATE_USER_FAILURE,
  error
});
////////////////////////////////
////////////////////////////
export const deleteUser = (userId,  history) => {
  return (dispatch, getState) => {
    dispatch(deleteUserStarted());

    const config = { headers: { authorization: getState().user.token, } };
    console.log(config);
    axios.delete(`/api/users/${userId}`,  config)
      .then(res => {
         dispatch(deleteUserSuccess(res.data));
         toastr.success('User Deleted');
        // history.push('/events');
      })
      .catch(err => {
         dispatch(deleteUserFailure(err.message));
         toastr.error(err.message);
      });
  };
};

const deleteUserSuccess = payload => ({
  type: actions.DELETE_USER_SUCCESS,
  payload,
});

const deleteUserStarted = () => ({
  type: actions.DELETE_USER_START
});

const deleteUserFailure = error => ({
  type: actions.DELETE_USER_FAILURE,
  error
});
////////////////////////////////
export const signupUser = (email, password, userName, firstName, lastName, history) => {
  return (dispatch, getState) => {
    dispatch(signupUserStarted());

    axios.post(`/api/signup`, { email: email, password: password, userName: userName, firstName: firstName, lastName: lastName })
      .then(res => {
        dispatch(signupUserSuccess(res.data));
        toastr.success('User created');
        history.push('/user-created');
      })
      .catch(err => {
        dispatch(signupUserFailure(err.message));
        toastr.error(err.message);
      });
  };
};

const signupUserSuccess = payload => ({
  type: actions.SIGNUP_USER_SUCCESS,
  payload,
});

const signupUserStarted = () => ({
  type: actions.SIGNUP_USER_START
});

const signupUserFailure = error => ({
  type: actions.SIGNUP_USER_FAILURE,
  error
});

export const authGoogleUser = (response) => {
  return dispatch => {
    dispatch(authGoogleUserStarted());
    console.log('Google resopnse', response);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };

    
    fetch(`${process.env.REACT_APP_AXIOS_BASE}api/google`, options)
      .then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
          if (token) {
            dispatch(authGoogleUserSuccess({ ...user, token }));
          }
          else {
            dispatch(authGoogleUserFailure('Google Auth: Cannot get token'));
          }
        });
      })
      .catch(err => dispatch(authGoogleUserFailure('Google Auth Error: ' + err.message)));
  };
};

const authGoogleUserStarted = () => ({
  type: actions.AUTH_GOOGLE_START
});

const authGoogleUserSuccess = payload => ({
  type: actions.AUTH_GOOGLE_SUCCESS,
  payload,
});

const authGoogleUserFailure = error => ({
  type: actions.AUTH_FAILURE,
  error
});