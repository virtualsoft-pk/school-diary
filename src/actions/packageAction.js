import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_PACKAGES,
  ADD_PACKAGE,
  UPDATE_PACKAGE,
  PACKAGE_ERROR,
  FILTER_PACKAGE,
  CLEAR_PACKAGE_FILTER,
  SET_PACKAGE_LOADING,
  CLEAR_PACKAGE_ERRORS,
  CLEAR_PACKAGE_MESSAGE,
  PACKAGE_DETAILS,
} from './types';

// Load Packages
export const loadPackages = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/package/packages');

    dispatch({
      type: GET_PACKAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PACKAGE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add Package
export const addPackage = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://159.89.172.36/package/packages',
      data,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    dispatch({
      type: ADD_PACKAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PACKAGE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Package
export const updatePackage = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `http://159.89.172.36/package/packages`,
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_PACKAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PACKAGE_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Get details of the package by id
export const packageDetails = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get(`http://159.89.172.36/package/packages/${id}`);

    dispatch({
      type: PACKAGE_DETAILS,
      payload: res.data.data[0],
    });
  } catch (err) {
    dispatch({
      type: PACKAGE_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Packages
export const filterPackages = (text) => {
  return {
    type: FILTER_PACKAGE,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_PACKAGE_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_PACKAGE_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_PACKAGE_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_PACKAGE_MESSAGE,
  };
};
