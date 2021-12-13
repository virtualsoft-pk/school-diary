import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  ORDERS_LOADED,
  NOTIFIC_ORDERS_LOADED,
  ORDER_DETAILS,
  UPDATE_ORDER,
  FILTER_ORDERS,
  APPROVE_ORDER,
  APPROVE_ERROR,
  ORDER_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  CLEAR_FILTER,
} from './types';

// Load Orders
export const loadOrders =(date = null) =>
  async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);
    try {
      const res = await axios.post(
        'http://174.138.48.157/Findmyparts/customer_order',
        date,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      dispatch({
        type: ORDERS_LOADED,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// Load Orders For Notifictaions
export const loadOrdersNotifications =() =>
  async (dispatch) => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.post(
        'http://174.138.48.157/Findmyparts/customer_order',
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
      let count = 0;
      for (let i = 0; i < Object.keys(res.data.data).length; i++) {
        if (res.data.data[i].status === 'neworder') {
          count = count + 1;
        }
      }

      dispatch({
        type: NOTIFIC_ORDERS_LOADED,
        payload: {
          data: res.data.data,
          status: count,
        },
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// Load order details
export const orderDetails = (data) => async (dispatch) => {
  // dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/customer_order',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ORDER_DETAILS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Load Orders
export const approveOrder = (data) => async (dispatch) => {
  // dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/sale_item',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: APPROVE_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPROVE_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const updateOrder = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_ORDER,
    payload: data,
  });
};

//Filter Order
export const filterOrder = (text) => {
  return {
    type: FILTER_ORDERS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
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
