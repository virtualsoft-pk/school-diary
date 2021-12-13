import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_CITY_SCHOOLS,
  CITY_SCHOOLS_ERROR,
  FILTER_CITY_SCHOOLS,
  CLEAR_CITY_SCHOOLS_FILTER,
  SET_CITY_SCHOOLS_LOADING,
  CLEAR_CITY_SCHOOLS_ERRORS,
  CLEAR_CITY_SCHOOLS_MESSAGE,
} from './types';

// get schools from specific city
export const loadSchools = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/school/schools_per_city?city=${data}`
    );

    dispatch({
      type: GET_CITY_SCHOOLS,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: CITY_SCHOOLS_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Schools
export const filterSchools = (text) => {
  return {
    type: FILTER_CITY_SCHOOLS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_CITY_SCHOOLS_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_CITY_SCHOOLS_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_CITY_SCHOOLS_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_CITY_SCHOOLS_MESSAGE,
  };
};
