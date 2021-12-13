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
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_MESSAGE,
} from '../../actions/types';

const initialState = {
  loading: false,
  error: null,
  message: null,
  orders: null,
  notificOrders: null,
  details: [],
  totalAmount: null,
  status: null,
  statusLabel: null,
  filtered: null,
  changeOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADED:
      if (state.statusLabel) {
        return {
          ...state,
          orders: action.payload,
          filtered: action.payload.filter((order) => {
            const regex = new RegExp(`${state.statusLabel}`, 'gi');
            return order.status.match(regex);
          }),
          loading: false,
        };
      } else
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
      case NOTIFIC_ORDERS_LOADED:
          return {
            ...state,
            notificOrders: action.payload.data,
            status: action.payload.status,
            loading: false,
          };
      
    case ORDER_DETAILS:
      return {
        ...state,
        details: action.payload.order_detail,
        totalAmount: action.payload.total_amount[0].total_amount,
        loading: false,
      };
    case APPROVE_ORDER:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case APPROVE_ERROR:
    case ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        changeOrder: action.payload,
      };
    case FILTER_ORDERS:
      return {
        ...state,
        statusLabel: action.payload,
        filtered: state.orders.filter((order) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return order.status.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        statusLabel: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
