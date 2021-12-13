import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_RENEWABLE_REQUEST,
  ADD_RENEWABLE_REQUEST,
  UPDATE_RENEWABLE_REQUEST,
  RENEWABLE_REQUEST_ERROR,
  FILTER_RENEWABLE_REQUEST,
  CLEAR_RENEWABLE_REQUEST_FILTER,
  SET_RENEWABLE_REQUEST_LOADING,
  CLEAR_RENEWABLE_REQUEST_ERRORS,
  CLEAR_RENEWABLE_REQUEST_MESSAGE,
} from './types';

// Load Renewable Requests
export const loadRenewableRequests = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/package/renew');

    dispatch({
      type: GET_RENEWABLE_REQUEST,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: RENEWABLE_REQUEST_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Renew Package
export const renewPackage = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try { 
    const res = await axios.post(
      `http://159.89.172.36/package/renew_subscription`,
      data
    );
      console.log(res)
    dispatch({
      type: ADD_RENEWABLE_REQUEST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RENEWABLE_REQUEST_ERROR,
      payload: err.response.data.error,
    });
  }
};

// // Add Renewable Request
// export const addRenewableRequest = (data) => async (dispatch) => {
//   dispatch(setLoading());
//   setAuthToken(localStorage.token);

//   try {
//     const res = await axios.post(
//       'http://159.89.172.36/package/packages/',
//       data,
//       {
//         headers: {
//           'content-type': 'application/json',
//         },
//       }
//     );

//     console.log(res);

//     dispatch({
//       type: ADD_RENEWABLE_REQUEST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: RENEWABLE_REQUEST_ERROR,
//       payload: err.response.data.error,
//     });
//   }
// };

// // Update Renewable Request
// export const updateRenewableRequest = (data) => async (dispatch) => {
//   dispatch(setLoading());
//   setAuthToken(localStorage.token);
//   try {
//     const res = await axios.post(
//       `http://159.89.172.36/package/packages/`,
//       data,
//       {
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//       }
//     );

//     console.log(res);

//     dispatch({
//       type: UPDATE_RENEWABLE_REQUEST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: RENEWABLE_REQUEST_ERROR,
//       payload: err.response.data.error,
//     });
//   }
// };

//Filter Renewable Requests
export const filterRenewableRequest = (text) => {
  return {
    type: FILTER_RENEWABLE_REQUEST,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_RENEWABLE_REQUEST_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_RENEWABLE_REQUEST_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_RENEWABLE_REQUEST_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_RENEWABLE_REQUEST_MESSAGE,
  };
};
