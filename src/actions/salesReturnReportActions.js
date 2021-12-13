import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_SALES_RETURN,
  SALES_RETURN_ERROR,
  SALES_RETURN_NULL,
  FILTER_SALES_RETURN,
  CLEAR_FILTER,
  SET_LOADING,
} from './types';

// Sales report Get
export const getSalesReturn = (date) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/sale_return_reports',
      date,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
    if (res.data.data !== null) {
      dispatch({
        type: GET_SALES_RETURN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: SALES_RETURN_NULL,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: SALES_RETURN_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Sales Return
export const filterSalesReturn = (text) => {
  return {
    type: FILTER_SALES_RETURN,
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
