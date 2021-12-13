import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_CLASS_ERRORS,
  SET_CLASS_LOADING,
  CLEAR_CLASS_MESSAGE,
  ADD_CLASS,
  CLASS_ERROR,
  GET_CLASSES,
  UPDATE_CLASS,
  DELETE_CLASS,
  FILTER_CLASSES,
  CLEAR_CLASSES_FILTER,
} from './types';

// get Class from server
export const getClass = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/classes/classes?school_id=${data}`
    );

    dispatch({
      type: GET_CLASSES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Class
export const addClass = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/classes/classes`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_CLASS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Class
export const updateClass = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/classes/classes`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_CLASS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Class from server
export const deleteClass = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/deleteClass/${id}`
    );

    dispatch({
      type: DELETE_CLASS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Class
export const filterClass = (text) => {
  return {
    type: FILTER_CLASSES,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_CLASSES_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_CLASS_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_CLASS_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_CLASS_MESSAGE,
  };
};
