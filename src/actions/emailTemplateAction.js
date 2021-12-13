import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { 
    GET_EMAIL_TEMPLATES,
    EMAIL_TEMPLATES_ERROR,
    GET_EMAIL_DETAILS,
    EMAIL_DETAILS_ERROR,
    UPDATE_TEMPLATE,
    UPDATE_TEMPLATE_ERROR,
    SET_LOADING,
    CLEAR_ERRORS,
    CLEAR_MESSAGE,
 } from './types';

 //Load All Email Templates
export const loadEmailTemplates = () => async (dispatch) => {
  // dispatch(setLoading());
  setAuthToken(localStorage.token);

try {
  const res = await axios.get(
    "http://174.138.48.157/Findmyparts/emailtemplate"
  );
 
  let orderPlace = null;
  let confirmOrder = null;
  let dispatchOrder = null;
  let returnOrder = null;
  let cancleOrder = null;
  let sendCredentials = null;
  let contactUs = null

  for(let i = 0 ; i < res.data.data.length ; i++){
   switch(res.data.data[i].id){
      case "1":
        orderPlace = res.data.data[i];
        break;
      case "2":
        confirmOrder = res.data.data[i];
        break;
      case "3":
        dispatchOrder = res.data.data[i];
        break;
      case "4":
        returnOrder = res.data.data[i];
        break;
      case "5":
        cancleOrder = res.data.data[i];
        break;
      case "6":
        sendCredentials = res.data.data[i];
        break;
      case "7":
        contactUs = res.data.data[i];
        break;
      default:
    }
  }

  
  dispatch({
    type: GET_EMAIL_TEMPLATES,
    payload: {
      data: res.data.data,
      orderPlace: orderPlace,
      confirmOrder: confirmOrder,
      dispatchOrder: dispatchOrder,
      returnOrder: returnOrder,
      cancleOrder: cancleOrder,
      sendCredentials: sendCredentials,
      contactUs: contactUs
    }
  });
} catch (err) {
  
  dispatch({
    type: EMAIL_TEMPLATES_ERROR,
    payload: err.response.data.error,
  });
}
};

//Get Template Details
export const loadEmailDetails = (id) => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);
  
  try {
    const res = await axios.get(
      `http://174.138.48.157/Findmyparts/emailtemplate/${id}`
    );
  
    dispatch({
      type: GET_EMAIL_DETAILS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_DETAILS_ERROR,
      payload: err.response.data.error,
    });
  }
  };

//Update email template
export const updateEmailTemplate = (data) => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);
  
    try {
        const res = await axios.post(
          'http://174.138.48.157/Findmyparts/emailtemplate',
          data,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        );
      dispatch({
        type: UPDATE_TEMPLATE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_TEMPLATE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// Set loading to true
export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  
// Clear Error
export const clearError = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
  
// Clear Message
export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE,
    };
};
  