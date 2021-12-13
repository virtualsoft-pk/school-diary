import {
  GET_SALES_RETURN,
  SALES_RETURN_ERROR,
  SALES_RETURN_NULL,
  FILTER_SALES_RETURN,
  CLEAR_FILTER,
  SET_LOADING,
} from '../../actions/types';
const initialState = {
  salesReturn: [],
  filtered: null,
  total_amount: null,
  total_quantity: null,
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_RETURN:
      return {
        ...state,
        salesReturn: Object.values(action.payload.sale_return),
        total_amount: action.payload.total_amount,
        total_quantity: action.payload.total_quantity,
        loading: false,
      };
    case SALES_RETURN_NULL:
      return {
        ...state,
        sales: action.payload,
        loading: false,
      };
    case SALES_RETURN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case FILTER_SALES_RETURN:
      return {
        ...state,
        filtered: state.salesReturn.filter((sale) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          if (sale.type_label) return sale.type_label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
