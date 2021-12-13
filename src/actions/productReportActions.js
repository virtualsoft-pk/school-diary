import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  PRODUCT_REPORT_LOADED,
  PRODUCT_REPORT_ERROR,
  PRODUCT_REPORT_NULL,
  FILTER_PRODUCT_REPORT,
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_ERRORS,
} from './types';

// get Product reports from server
export const loadProductReport = (date) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('http://174.138.48.157/Findmyparts/product_reports', date, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    if (res.data.data !== null) {
      dispatch({
        type: PRODUCT_REPORT_LOADED,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: PRODUCT_REPORT_NULL,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: PRODUCT_REPORT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Product
export const filterProduct = (text) => {
  return {
    type: FILTER_PRODUCT_REPORT,
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
