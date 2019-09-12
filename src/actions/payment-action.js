import axios from 'axios';

import * as actions from './types';


export const PAYMENT_ACTION_START = 'PAYMENT_ACTION_START';
export const PAYMENT_ACTION_SUCCESS = 'PAYMENT_ACTION_SUCCESS';
export const PAYMENT_ACTION_FAILURE = 'PAYMENT_ACTION_FAILURE';

export const pay = (token, eventId) => {
    return (dispatch, getState) => {
      dispatch(payStarted());
  
      const config = { headers: { authorization: getState().user.token, } };
  
      axios.post(`/api/stripe`, { token, eventId }, config)
        .then(res => {
           dispatch(paySuccess(res.data));
        })
        .catch(err => {
           dispatch(payFailure(err.message));
        });
    };
  };
  
  const paySuccess = payload => ({
    type: actions.PAYMENT_ACTION_SUCCESS,
    payload,
  });
  
  const payStarted = () => ({
    type: actions.PAYMENT_ACTION_START
  });

  const payFailure = error => ({
    type: actions.PAYMENT_ACTION_FAILURE,
    error
  });
  