import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  PURCHASE_RETURN_REPORT_LOADED,
  PURCHASE_RETURN_REPORT_ERROR,
  PURCHASE_RETURN_REPORT_NULL,
  FILTER_PURCHASE_RETURN,
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_ERRORS,
} from './types';

// get purchase reports from server
export const loadPurchaseReturnReport = (date) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/purchase_return_reports',
      date,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
    if (res.data.data !== null) {
      dispatch({
        type: PURCHASE_RETURN_REPORT_LOADED,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: PURCHASE_RETURN_REPORT_NULL,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: PURCHASE_RETURN_REPORT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Purchase Return
export const filterPurchaseReturn = (text) => {
  return {
    type: FILTER_PURCHASE_RETURN,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
