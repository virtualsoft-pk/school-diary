import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import moment from 'moment';
import {
  GET_AMOUNTS,
  GET_SALES,
  GET_SALES_NULL,
  SALES_ERROR,
  SET_LOADING,
  FILTER_SALES,
  CLEAR_FILTER,
} from './types';

// Sales report Get
export const getSales = (date) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/sale_reports',
      date,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
    if (res.data.data !== null) {
      dispatch({
        type: GET_SALES,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SALES_NULL,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Get sell-amount and purchase-amount
export const getSellAndPurchaseAmount =
  (startDate, endDate) => async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);

    let fromDate = startDate;
    let toDate = endDate;
    let data = [];

    for (let i = 1; i <= 12; i++) {
      let date = {
        from: moment(fromDate).format('YYYY-MM-DD'),
        to: moment(toDate).format('YYYY-MM-DD'),
      };
      try {
        const res = await axios.post(
          'http://174.138.48.157/Findmyparts/sale_reports',
          date,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        );
        data.unshift({
          sell_amount: res.data.data === null ? 0 : res.data.data.total_amount,
          purchase_amount:
            res.data.data === null ? 0 : res.data.data.total_p_amount,
          month: new Date(toDate).getMonth(),
        });

        toDate = new Date(
          moment(fromDate).subtract(1, 'days').format('YYYY-MM-DD')
        );
        fromDate = new Date(
          moment(fromDate).subtract(1, 'months').format('YYYY-MM-DD')
        );
      } catch (err) {
        dispatch({
          type: SALES_ERROR,
          payload: err.response.data.error,
        });
      }
    }
    dispatch({
      type: GET_AMOUNTS,
      payload: data,
    });
  };

//Filter Sales
export const filterSales = (text) => {
  return {
    type: FILTER_SALES,
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
