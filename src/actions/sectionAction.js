import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_SECTION_ERRORS,
  SET_SECTION_LOADING,
  CLEAR_SECTION_MESSAGE,
  ADD_SECTION,
  SECTION_ERROR,
  GET_SECTIONS,
  UPDATE_SECTION,
  FILTER_SECTIONS,
  CLEAR_SECTION_FILTER,
  GET_CLASS_SECTIONS
} from './types';

// Get Section from server
export const getSection = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/classes/sections?school_id=${data}`
    );

    dispatch({
      type: GET_SECTIONS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Get Section from server
export const getClassSection = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/classes/get_class_sections?class_id=${data}`
    );

    dispatch({
      type: GET_CLASS_SECTIONS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Section
export const addSection = (data) => async (dispatch) => {
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
      type: ADD_SECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Section
export const updateSection = (data) => async (dispatch) => {
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
      type: UPDATE_SECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Class from server
// export const deleteSection = (id) => async (dispatch) => {
//   dispatch(setLoading());

//   try {
//     const res = await axios.post(
//       `http://174.138.48.157/Findmyparts/deleteClass/${id}`
//     );

//     dispatch({
//       type: DELETE_SECTION,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: SECTION_ERROR,
//       payload: err.response.data.error,
//     });
//   }
// };

//Filter Section
export const filterSection = (text) => {
  return {
    type: FILTER_SECTIONS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_SECTION_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_SECTION_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_SECTION_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_SECTION_MESSAGE,
  };
};
