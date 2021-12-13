import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { STOCK_ALERT, STOCK_ALERT_ERROR } from './types';

// Check stock alert
export const loadStockAlert = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      "http://174.138.48.157/Findmyparts/stock_check"
    );
    dispatch({
      type: STOCK_ALERT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: STOCK_ALERT_ERROR,
      payload: err.response.data.error,
    });
  }
};
