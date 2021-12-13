import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { 
SUPPORT_SEND ,
SUPPORT_LOADING ,
SUPPORT_ERROR ,
SUPPORT_CLEAR_ERROR,
SUPPORT_CLEAR_MESSAGE
 } from './types';

// Send Support
export const support = (data) => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);
  
    try {
      const res = await axios.post('http://159.89.172.36/super_admin/support', data);
  
      console.log(res);
  
      dispatch({
        type: SUPPORT_SEND,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SUPPORT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// Set loading to true
export const setLoading = () => {
    return {
      type: SUPPORT_LOADING,
    };
  };

// Clear Error
export const clearError = () => {
    return {
      type: SUPPORT_CLEAR_ERROR,
    };
  };
  
  // Clear Message
  export const clearMessage = () => {
    return {
      type: SUPPORT_CLEAR_MESSAGE,
    };
  };