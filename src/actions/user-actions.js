import axios from 'axios';

import * as actions from './types';

export const authUser = (userName, password) => {
  return dispatch => {
    dispatch(authUserStarted());

    axios.post('/api/login', { email: userName, password: password })
      .then(res => {
        console.log('res', res);
        dispatch(authUserSuccess(res.data));
      })
      .catch(err => {
        dispatch(authUserFailure(err.message));
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

export const updateUser = (userId, firstName, lastName) => {
  return (dispatch, getState) => {
    dispatch(updateUserStarted());

    const config = { headers: { authorization: getState().user.token,}};

    axios.put(`/api/users/${userId}`, { id: userId, firstName: firstName, lastName: lastName }, config)
      .then(res => {
        console.log('res.data', res);
        return dispatch(updateUserSuccess(res.data));
      })
      .catch(err => {
        return dispatch(updateUserFailure(err.message));
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


