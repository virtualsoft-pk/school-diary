import {
  PURCHASE_RETURN_REPORT_LOADED,
  PURCHASE_RETURN_REPORT_ERROR,
  PURCHASE_RETURN_REPORT_NULL,
  FILTER_PURCHASE_RETURN,
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_ERRORS,
} from '../../actions/types';

const initialState = {
  loading: false,
  error: null,
  purchaseReturn: [],
  totalAmount: 0,
  totalQuantity: 0,
  filtered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_RETURN_REPORT_LOADED:
      return {
        ...state,
        purchaseReturn: Object.values(action.payload.purchase_return).sort(
          (a, b) => {
            return new Date(b.created_on) - new Date(a.created_on);
          }
        ),
        totalAmount: action.payload.total_amount,
        totalQuantity: action.payload.total_quantity,
        loading: false,
      };

    case PURCHASE_RETURN_REPORT_NULL:
      return {
        ...state,
        purchaseReturn: action.payload,
        totalAmount: 0,
        totalQuantity: 0,
        loading: false,
      };

    case FILTER_PURCHASE_RETURN:
      return {
        ...state,
        filtered: state.purchaseReturn.filter((purchase) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          if (purchase.type_label) return purchase.type_label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case PURCHASE_RETURN_REPORT_ERROR:
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
