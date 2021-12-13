import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_FEE_GROUP_ERRORS,
  SET_FEE_GROUP_LOADING,
  CLEAR_FEE_GROUP_MESSAGE,
  ADD_FEE_GROUP,
  FEE_GROUP_ERROR,
  GET_FEE_GROUPS,
  UPDATE_FEE_GROUP,
  FILTER_FEE_GROUPS,
  CLEAR_FEE_GROUP_FILTER,
} from './types';

// Get fee group from server
export const getFeeGroup = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/fee/fee_label?school_id=${data}`
    );

    dispatch({
      type: GET_FEE_GROUPS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_GROUP_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Fee Group
export const addFeeGroup = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_label`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_FEE_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_GROUP_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Fee Group
export const updateFeeGroup = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_label`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_FEE_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_GROUP_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Fee Group
export const filterFeeGroup = (text) => {
  return {
    type: FILTER_FEE_GROUPS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FEE_GROUP_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_FEE_GROUP_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_FEE_GROUP_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_FEE_GROUP_MESSAGE,
  };
};
