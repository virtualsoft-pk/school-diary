import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_ROLE_ERRORS,
  SET_ROLE_LOADING,
  CLEAR_ROLE_MESSAGE,
  ADD_ROLE,
  ROLE_ERROR,
  GET_ROLES,
  UPDATE_ROLE,
  DELETE_ROLE,
  FILTER_ROLES,
  CLEAR_ROLES_FILTER,
} from './types';

// get role
export const getRole = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://159.89.172.36/role/roles?school_id=${data}`
    );
    dispatch({
      type: GET_ROLES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: ROLE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New Role
export const addRole = (role) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://159.89.172.36/role/roles`, role, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    dispatch({
      type: ADD_ROLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROLE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Role
export const updateRole = (role) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://159.89.172.36/role/roles`, role, {
      headers: {
        'content-type': 'application/json',
      },
    });

    dispatch({
      type: UPDATE_ROLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROLE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// // Delete Class from server
// export const deleteClass = (id) => async (dispatch) => {
//   dispatch(setLoading());

//   try {
//     const res = await axios.post(
//       `http://174.138.48.157/Findmyparts/deleteClass/${id}`
//     );

//     dispatch({
//       type: DELETE_ROLE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ROLE_ERROR,
//       payload: err.response.data.error,
//     });
//   }
// };

//Filter Role
export const filterRole = (text) => {
  return {
    type: FILTER_ROLES,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_ROLES_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_ROLE_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_ROLE_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_ROLE_MESSAGE,
  };
};
