import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_FEE_MASTER_ERRORS,
  SET_FEE_MASTER_LOADING,
  CLEAR_FEE_MASTER_MESSAGE,
  ADD_FEE_MASTER,
  FEE_MASTER_ERROR,
  GET_FEE_MASTER,
  UPDATE_FEE_MASTER,
  FILTER_FEE_MASTER,
  CLEAR_FEE_MASTER_FILTER,
} from './types';

// Get fee master from server
export const getFeeMaster = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/fee/fee_master?school_id=${data}`
    );

    dispatch({
      type: GET_FEE_MASTER,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_MASTER_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Fee Master
export const addFeeMaster = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_master`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: ADD_FEE_MASTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_MASTER_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Fee Master
export const updateFeeMaster = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/fee/fee_master`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_FEE_MASTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEE_MASTER_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Fee Master
export const filterFeeMaster = (text) => {
  return {
    type: FILTER_FEE_MASTER,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FEE_MASTER_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_FEE_MASTER_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_FEE_MASTER_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_FEE_MASTER_MESSAGE,
  };
};
