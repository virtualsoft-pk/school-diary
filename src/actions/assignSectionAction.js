import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_ASSIGN_SECTION_ERRORS,
  SET_ASSIGN_SECTION_LOADING,
  CLEAR_ASSIGN_SECTION_MESSAGE,
  ADD_ASSIGN_SECTION,
  ASSIGN_SECTION_ERROR,
  GET_ASSIGN_SECTIONS,
  UPDATE_ASSIGN_SECTION,
  FILTER_ASSIGN_SECTIONS,
  CLEAR_ASSIGN_SECTION_FILTER,
} from './types';

// Get Assign Section from server
export const getAssignSection = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/classes/assign_class_sections?school_id=${data}`
    );

    dispatch({
      type: GET_ASSIGN_SECTIONS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGN_SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Assign Section to Class
export const addAssignSection = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      `http://159.89.172.36/classes/assign_class_sections`,
      data,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    dispatch({
      type: ADD_ASSIGN_SECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGN_SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Assign Section
export const updateAssignSection = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `http://159.89.172.36/classes/sections`,
      data,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    dispatch({
      type: UPDATE_ASSIGN_SECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGN_SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Assign Section
export const filterAssignSection = (text) => {
  return {
    type: FILTER_ASSIGN_SECTIONS,
    payload: text,
  };
};

// Clear Assign Filter
export const clearFilter = () => {
  return { type: CLEAR_ASSIGN_SECTION_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_ASSIGN_SECTION_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_ASSIGN_SECTION_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_ASSIGN_SECTION_MESSAGE,
  };
};
