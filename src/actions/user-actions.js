import axios from 'axios';

import * as actions from './types';

export const updateUser = (userId, firstName, lastName) => {
  return dispatch => {
    dispatch(updateUserStarted());

    axios.put(`/api/users/${userId}`, { id: userId, firstName: firstName, lastName: lastName })
      .then(res => {
        console.log('Updated user', res);
        dispatch(updateUserSuccess(res.data.user));
      })
      .catch(err => {
        console.log('Error', err);
        dispatch(updateUserFailure(err.message));
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