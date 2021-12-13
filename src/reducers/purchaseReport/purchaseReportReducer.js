import {
  PURCHASE_REPORT_LOADED,
  PURCHASE_REPORT_ERROR,
  PURCHASE_REPORT_NULL,
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_ERRORS,
  FILTER_PURCHASE_REPORT,
} from '../../actions/types';

const initialState = {
  loading: false,
  error: null,
  purchase: [],
  totalAmount: 0,
  totalQuantity: 0,
  filtered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_REPORT_LOADED:
      return {
        ...state,
        purchase: [
          ...Object.values(action.payload.purchase),
          ...Object.values(action.payload.purchase_old),
        ].sort((a, b) => {
          return new Date(b.created_on) - new Date(a.created_on);
        }),
        totalAmount: action.payload.total_amount,
        totalQuantity: action.payload.total_quantity,
        loading: false,
      };

    case PURCHASE_REPORT_NULL:
      return {
        ...state,
        purchase: action.payload,
        totalAmount: 0,
        totalQuantity: 0,
        loading: false,
      };

    case FILTER_PURCHASE_REPORT:
      return {
        ...state,
        filtered: state.purchase.filter((filtering) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          if (filtering.type_label) return filtering.type_label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case PURCHASE_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
