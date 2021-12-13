import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_FEE_DISCOUNT_ERRORS,
  SET_FEE_DISCOUNT_LOADING,
  CLEAR_FEE_DISCOUNT_MESSAGE,
  ADD_FEE_DISCOUNT,
  FEE_DISCOUNT_ERROR,
  GET_FEE_DISCOUNT,
  UPDATE_FEE_DISCOUNT,
  FILTER_FEE_DISCOUNT,
  CLEAR_FEE_DISCOUNT_FILTER,
} from './types';

// Get fee discount from server
export const getFeeDiscount = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/fee/fee_discount?school_id=${data}`
    );

    dispatch({
      type: GET_FEE_DISCOUNT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_DISCOUNT_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Fee discount
export const addFeeDiscount = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_discount`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_FEE_DISCOUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_DISCOUNT_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Fee discount
export const updateFeeDiscount = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_discount`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_FEE_DISCOUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_DISCOUNT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Fee discount
export const filterFeeType = (text) => {
  return {
    type: FILTER_FEE_DISCOUNT,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FEE_DISCOUNT_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_FEE_DISCOUNT_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_FEE_DISCOUNT_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_FEE_DISCOUNT_MESSAGE,
  };
};
