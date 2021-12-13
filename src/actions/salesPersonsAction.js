import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { 
    GET_SALES_PERSONS,
    ADD_SALES_PERSONS,
    UPDATE_SALES_PERSONS,
    FILTER_SALES_PERSONS, 
    SET_SALES_PERSONS_LOADING,
    SALES_PERSONS_ERROR,
    CLEAR_SALES_PERSONS_FILTER,
    CLEAR_SALES_PERSONS_MESSAGE,
    CLEAR_SALES_PERSONS_ERRORS,
 } from './types';

// Get Sales Persons 
export const loadSalesPersons = () => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      "http://159.89.172.36/super_admin/sale_persons"
    );
    dispatch({
      type: GET_SALES_PERSONS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: SALES_PERSONS_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Add Sales Persons
export const addSalesPersons = (data) => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);
  
    try {
        const res = await axios.post(
          'http://159.89.172.36/super_admin/sale_persons', data );

        dispatch({
        type: ADD_SALES_PERSONS,
        payload: res.data,
        });
    } catch (err) {
        dispatch({
        type: SALES_PERSONS_ERROR,
        payload: err.response.data.error,
        });
    }
    };

// Update Sales Persons
export const updateSalesPersons = (data) => async (dispatch) => {

    dispatch(setLoading());
    setAuthToken(localStorage.token);
    try {
      const updateRes = await axios.post(`http://159.89.172.36/super_admin/sale_persons`, data);
      const getByIdRes = await axios.get(`http://159.89.172.36/super_admin/sale_persons/${data.id}`, data);
     
      dispatch({
        type: UPDATE_SALES_PERSONS,
        payload: {
          message: updateRes.data.message,
          data: getByIdRes.data.data[0]
          }
      });
    } catch (err) {
      dispatch({
        type: SALES_PERSONS_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  
  //Filter Sales Persons
  export const filterSalesPersons = (text) => {
    return {
      type: FILTER_SALES_PERSONS,
      payload: text,
    };
  };
  
  // Clear Filter
  export const clearFilter = () => {
    return { type: CLEAR_SALES_PERSONS_FILTER };
  };
  
  // Set loading to true
  export const setLoading = () => {
    return {
      type: SET_SALES_PERSONS_LOADING,
    };
  };
  
  // Clear Error
  export const clearError = () => {
    return {
      type: CLEAR_SALES_PERSONS_ERRORS,
    };
  };
  // Clear Message
  export const clearMessage = () => {
    return {
      type: CLEAR_SALES_PERSONS_MESSAGE,
    };
  };
  