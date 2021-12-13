import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_EMAIL_LOG_ERRORS,
  SET_EMAIL_LOG_LOADING,
  CLEAR_EMAIL_LOG_MESSAGE,
  ADD_EMAIL_LOG,
  EMAIL_LOG_ERROR,
  GET_EMAIL_LOGS,
  UPDATE_EMAIL_LOG,
  FILTER_EMAIL_LOGS,
  CLEAR_EMAIL_LOG_FILTER,
} from './types';

// Get Email Log & SMS from server
export const getEmailLog = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/communicate/get_email_sms_logs`
    );

    dispatch({
      type: GET_EMAIL_LOGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_LOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Email Log & SMS
export const addEmailLog = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_label`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_EMAIL_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_LOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Email Log & SMS
export const updateEmailLog = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_label`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_EMAIL_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_LOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Email Log & SMS
export const filterEmailLog = (text) => {
  return {
    type: FILTER_EMAIL_LOGS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_EMAIL_LOG_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_EMAIL_LOG_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_EMAIL_LOG_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_EMAIL_LOG_MESSAGE,
  };
};
