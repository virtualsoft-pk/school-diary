import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_INCOME,
  INCOME_ERROR,
  FILTER_INCOME,
  CLEAR_INCOME_FILTER,
  SET_INCOME_LOADING,
  CLEAR_INCOME_ERRORS,
  CLEAR_INCOME_MESSAGE,
  INCOME_DETAILS,
  ADD_SUB
} from './types';

// Load Income
export const loadIncomes = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/income/income');
    console.log(res);

    dispatch({
      type: GET_INCOME,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: INCOME_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Get details of the Income by id
export const incomeDetails = (data) => async (dispatch) => {
  dispatch(setLoading()); 
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `http://159.89.172.36/income/package_income_details`,
      data
    );

    dispatch({
      type: INCOME_DETAILS,
      payload: { data: res.data.data, id: data.package_id },
    });
  } catch (err) {
    dispatch({
      type: INCOME_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Add subscription
export const addSubscription = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `http://159.89.172.36/package/renew_subscription`,
      data
    );
      console.log(res)
    dispatch({
      type: ADD_SUB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INCOME_ERROR,
      payload: err.response.data.error,
    });
  }
};


//Filter Packages
export const filterPackages = (text) => {
  return {
    type: FILTER_INCOME,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_INCOME_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_INCOME_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_INCOME_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_INCOME_MESSAGE,
  };
};
