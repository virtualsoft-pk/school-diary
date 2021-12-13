import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_STUD_CAT_ERRORS,
  SET_STUD_CAT_LOADING,
  CLEAR_STUD_CAT_MESSAGE,
  ADD_STUD_CAT,
  STUD_CAT_ERROR,
  GET_STUD_CAT,
  UPDATE_STUD_CAT,
  FILTER_STUD_CAT,
  CLEAR_STUD_CAT_FILTER,
} from './types';

// Get student category from server
export const getStudentCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/student/student_categories?school_id=${data}`
    );

    dispatch({
      type: GET_STUD_CAT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: STUD_CAT_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New student category
export const addStudentCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/student/student_categories`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_STUD_CAT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUD_CAT_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update student category
export const updateStudentCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/student/student_categories`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_STUD_CAT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUD_CAT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter student category
export const filterFeeType = (text) => {
  return {
    type: FILTER_STUD_CAT,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_STUD_CAT_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_STUD_CAT_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_STUD_CAT_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_STUD_CAT_MESSAGE,
  };
};
