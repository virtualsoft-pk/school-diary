import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_SCHOOLS,
  ADD_SCHOOL,
  UPDATE_SCHOOL,
  SCHOOL_ERROR,
  FILTER_SCHOOLS,
  CLEAR_SCHOOLS_FILTER,
  SET_SCHOOL_LOADING,
  CLEAR_SCHOOL_ERRORS,
  CLEAR_SCHOOL_MESSAGE,
  UPLOAD_IMAGE_ERROR,
  VIEW_SCHOOL,
  GET_SUBSCRIPTION_HISTORY,
  GET_COUNTRIES,
  COUNTRIES_ERROR,
  GET_STATES,
  STATES_ERROR,
  GET_CITIES,
  CITIES_ERROR,
} from './types'; 

//Load Countries
export const getCountries = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://countriesnow.space/api/v0.1/countries'
    );
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('errororororr', err);
    dispatch({
      type: COUNTRIES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Load States
export const getStates = (country) => async (dispatch) => {
  try {
    const res = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/states',
      { country: country }
    );
    dispatch({
      type: GET_STATES,
      payload: res.data.data.states,
    });
  } catch (err) {
    console.log('errororororr', err);
    dispatch({
      type: STATES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Load cities without states
export const getCities = (country) => async (dispatch) => {
  try {
    const res = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/cities',
      { country: country }
    );
    dispatch({
      type: GET_CITIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('errororororr', err);
    dispatch({
      type: CITIES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Load States
export const getStateCities = (country, state) => async (dispatch) => {
  try {
    const res = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      { country: country, state: state }
    );
    dispatch({
      type: GET_CITIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('errororororr', err);
    dispatch({
      type: CITIES_ERROR,
      payload: err.response.data.error,
    });
  }
};

// load schools
export const loadSchools = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://159.89.172.36/school/schools');
    console.log("res.data", res.data.school_count.schools_count)
    dispatch({
      type: GET_SCHOOLS,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: SCHOOL_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add School
export const addSchool = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('http://159.89.172.36/school/schools', data);

    console.log(res);

    dispatch({
      type: ADD_SCHOOL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCHOOL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//upload image
export const uploadImage= (file) => async (dispatch) => {
  console.log("inside action ", file)
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      'http://159.89.172.36/uploads/image_upload',
      file
    );
    console.log("responseee imageee:::::::", res)

    return res.data;
  } catch (err) {
    console.log("err", err)
    dispatch({
      type: UPLOAD_IMAGE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update School
export const updateSchool = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const updateRes = await axios.post(`http://159.89.172.36/school/schools`, data, {
      headers: {
        'content-type': 'application/json',
      },
    });

    const getByIdRes = await axios.get(`http://159.89.172.36/school/schools/${data.id}`);
    console.log(getByIdRes.data.data[0]);

    dispatch({
      type: UPDATE_SCHOOL,
      payload: {
        message: updateRes.data.message,
        data: getByIdRes.data.data[0]
        }
    });
  } catch (err) {
    dispatch({
      type: SCHOOL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Sending Data for View School page
export const viewSchool = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get(`http://159.89.172.36/school/schools/${id}`);
    console.log("response",res.data.data[0]);

    dispatch({ 
      type: VIEW_SCHOOL,
      payload: res.data.data[0],
    });
  } catch (err) {
    dispatch({
      type: SCHOOL_ERROR,
      payload: err.response.data.error,
    });
  }
};

// load school subscription history
export const loadHistory = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get(
      `http://159.89.172.36/school/school_subscription_history/${id}`
    );
    dispatch({
      type: GET_SUBSCRIPTION_HISTORY,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: SCHOOL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Schools
export const filterSchools = (text) => {
  return {
    type: FILTER_SCHOOLS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_SCHOOLS_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_SCHOOL_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_SCHOOL_ERRORS,
  };
};

// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_SCHOOL_MESSAGE,
  };
};