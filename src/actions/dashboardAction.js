import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_DASHBOARD,
  SET_DASHBOARD_LOADING,
  DASHBOARD_ERROR,
  CLEAR_DASHBOARD_SCHOOLS_FILTER,
  FILTER_DASHBOARD_SCHOOLS,
  CLEAR_DASHBOARD_CITY_FILTER,
  FILTER_DASHBOARD_CITIES,
  FILTER_DASHBOARD_COUNTRIES,
  CLEAR_DASHBOARD_COUNTRIES_FILTER,
  GET_CITY_NAME,
  CLEAR_DASHBOARD_ERRORS,
  CLEAR_DASHBOARD_MESSAGE,
} from './types';

// Sales report Get
export const getDashboard = (date) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/dashboard/dashboard');
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: err.response.data.error,
    });
  }
};

//City name
export const getCityName = (data) => {
  return {
    type: GET_CITY_NAME,
    payload: data,
  };
};
//Filter Schools
export const filterSchools = (text) => {
  return {
    type: FILTER_DASHBOARD_SCHOOLS,
    payload: text,
  };
};

// Clear School Filter
export const clearSchoolFilter = () => {
  return { type: CLEAR_DASHBOARD_SCHOOLS_FILTER };
};

//Filter City
export const filterCities = (text) => {
  return {
    type: FILTER_DASHBOARD_CITIES,
    payload: text,
  };
};

// Clear City Filter
export const clearCityFilter = () => {
  return { type: CLEAR_DASHBOARD_CITY_FILTER };
};

//Filter Countries
export const filterCountries = (text) => {
  return {
    type: FILTER_DASHBOARD_COUNTRIES,
    payload: text,
  };
};

// Clear Countries Filter
export const clearCountriesFilter = () => {
  return { type: CLEAR_DASHBOARD_COUNTRIES_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_DASHBOARD_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_DASHBOARD_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_DASHBOARD_MESSAGE,
  };
};
