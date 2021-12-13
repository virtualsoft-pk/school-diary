import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_NOTIFICATION,
  NOTIFICATION_ERROR,
  SET_NOTIFICATION_LOADING,
  CLEAR_NOTIFICATION_ERRORS,
  CLEAR_NOTIFICATION_MESSAGE,
  UPDATE_NOTIFICATION,
} from './types';

// Get notification
export const loadNotification = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      'http://159.89.172.36/settings/notification_settings'
    );
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update Notification
export const updateNotification = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://159.89.172.36/settings/notification_settings',
      data
    );
    dispatch({
      type: UPDATE_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_NOTIFICATION_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_NOTIFICATION_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_NOTIFICATION_MESSAGE,
  };
};
