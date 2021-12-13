import { STOCK_ALERT, STOCK_ALERT_ERROR } from '../../actions/types';

const initialState = {
  stock: null,
  alert: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STOCK_ALERT:
      return {
        ...state,
        stock: action.payload.stock,
        alert: action.payload.stock_alert,
      };
    case STOCK_ALERT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
