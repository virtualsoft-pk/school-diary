import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_SUB_ADMIN,
  SUB_ADMIN_ERROR,
  ADD_SUB_ADMIN,
  UPDATE_SUB_ADMIN,
  DELETE_SUB_ADMIN,
  SET_SUB_ADMIN_LOADING,
  CLEAR_SUB_ADMIN_ERRORS,
  CLEAR_SUB_ADMIN_MESSAGE,
  ALLOW_ACCESS,
  ADMIN_DATA_ERROR,
  GET_ADMIN_DATA,
  USER_ROLES_ERROR,
  FILTER_USERS,
  CLEAR_USER_FILTER,
} from './types';

// Get Users
export const loadSubAdmin = () => async (dispatch) => {
  console.log('inside actions');
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      'http://159.89.172.36/super_admin/super_admins'
    );
    dispatch({
      type: GET_SUB_ADMIN,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: SUB_ADMIN_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Add Subadmin
export const addSubAdmin = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const addRes = await axios.post(
      'http://159.89.172.36/super_admin/super_admins',
      data
    );

    //Grant access
    const accessData = {
      id: addRes.data.data,
      access: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21,
      ],
    };
    const res = await axios.post(
      'http://159.89.172.36/super_admin/access',
      accessData
    );

    //Dispatch with add user message
    dispatch({
      type: ADD_SUB_ADMIN,
      payload: addRes.data,
    });
  } catch (err) {
    dispatch({
      type: SUB_ADMIN_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update Password
export const updateSubAdmin = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://159.89.172.36/super_admin/change_password',
      data
    );
    dispatch({
      type: UPDATE_SUB_ADMIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUB_ADMIN_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Subadmin
export const deleteSubAdmin = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `http://159.89.172.36/super_admin/auth_permission`,
      data
    );

    dispatch({
      type: DELETE_SUB_ADMIN,
      payload: res.data,
    });
    dispatch(loadSubAdmin());
  } catch (err) {
    dispatch({
      type: SUB_ADMIN_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Get Admin Data
export const loadAdminData = (id) => async (dispatch) => {
  const data = {
    id: id,
  };
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://159.89.172.36/super_admin/user_profile',
      data
    );
    dispatch({
      type: GET_ADMIN_DATA,
      payload: res.data.data[0],
    });
  } catch (err) {
    dispatch({
      type: ADMIN_DATA_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Assign roles
export const allowAccess = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://159.89.172.36/super_admin/access',
      data
    );
    dispatch({
      type: ALLOW_ACCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_DATA_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Filter Sub-Category
export const filterUsers = (text) => {
  return {
    type: FILTER_USERS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_USER_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_SUB_ADMIN_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_SUB_ADMIN_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_SUB_ADMIN_MESSAGE,
  };
};
