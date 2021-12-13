import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { CONTACT_US, CONTACT_US_ERROR, SEND_REPLY, SEND_REPLY_ERROR, CLEAR_ERRORS, CLEAR_MESSAGE, DELETE_CONTACT_US, DELETE_CONTACT_US_ERROR } from './types';

// Check contact us
export const loadContactUs = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      "http://174.138.48.157/Findmyparts/contact_us"
    );
   
    let count = 0;
    for(let i = 0; i < Object.keys(res.data.data).length; i++){
      
      if(parseInt (res.data.data[i].status) === 1){
        count = count + 1;
      }
    }
    dispatch({
      type: CONTACT_US,
      payload: {
        data:res.data.data,
        count: count
      }
    });
  } catch (err) {
    dispatch({
      type: CONTACT_US_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Read message
export const readMessage = (id) => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://174.138.48.157/Findmyparts/contact_us/${id}`
    );
    let count = 0;
    for(let i = 0; i < Object.keys(res.data.data).length; i++){
      
      if(parseInt (res.data.data[i].status) === 1){
        count = count + 1;
      }
    }
    dispatch({
      type: CONTACT_US,
      payload: {
        data:res.data.data,
        count: count
      }
    });
  } catch (err) {
    dispatch({
      type: CONTACT_US_ERROR,
      payload: err.response.data.error,
    });
  }
};

// send reply
export const sendReply = (data) => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
      const res = await axios.post(
        "http://174.138.48.157/Findmyparts/contact_us",
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
    dispatch({
      type: SEND_REPLY,
      payload: res.data,
    });
  } catch (err) {
     
    dispatch({
      type: SEND_REPLY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Contact us
export const deleteContactUs = (id) => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/delete_contact_us/${id}`
    );

    dispatch({
      type: DELETE_CONTACT_US,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_CONTACT_US_ERROR,
      payload: err.response.data.error,
    });
  }
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