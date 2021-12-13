import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_FEE_TYPE_ERRORS,
  SET_FEE_TYPE_LOADING,
  CLEAR_FEE_TYPE_MESSAGE,
  ADD_FEE_TYPE,
  FEE_TYPE_ERROR,
  GET_FEE_TYPES,
  UPDATE_FEE_TYPE,
  FILTER_FEE_TYPES,
  CLEAR_FEE_TYPE_FILTER,
} from './types';

// Get fee type from server
export const getFeeType = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/fee/fee_types?school_id=${data}`
    );

    dispatch({
      type: GET_FEE_TYPES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_TYPE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Fee Type
export const addFeeType = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_types`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_FEE_TYPE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_TYPE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Fee Type
export const updateFeeType = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_types`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_FEE_TYPE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_TYPE_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Fee Type
export const filterFeeType = (text) => {
  return {
    type: FILTER_FEE_TYPES,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FEE_TYPE_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_FEE_TYPE_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_FEE_TYPE_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_FEE_TYPE_MESSAGE,
  };
};
