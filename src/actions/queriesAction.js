import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_QUERIES,
  QUERIES_REPLY,
  QUERY_ERROR,
  FILTER_QUERIES,
  CLEAR_QUERIES_FILTER,
  SET_QUERY_LOADING,
  CLEAR_QUERY_ERRORS,
  CLEAR_QUERY_MESSAGE,
  DELETE_QUERY,
} from './types';

// load schools
export const loadQueries = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/query/queries');
    console.log(res);
    dispatch({
      type: GET_QUERIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: QUERY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Reply Of Query
export const queryReply = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('http://159.89.172.36/query/queries', data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: QUERIES_REPLY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUERY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Query from the server
export const deleteQuery = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(`http://159.89.172.36/query/queries/${id}`);

    dispatch({
      type: DELETE_QUERY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUERY_ERROR,
      payload: err.response.data.error,
    });
  }
};
// //Filter Queries
// export const filterQueries = (text) => {
//   return {
//     type: FILTER_QUERIES,
//     payload: text,
//   };
// };

// // Clear Filter
// export const clearFilter = () => {
//   return { type: CLEAR_QUERIES_FILTER };
// };

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_QUERY_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_QUERY_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_QUERY_MESSAGE,
  };
};
