import {
  GET_SALES,
  GET_SALES_NULL,
  SALES_ERROR,
  FILTER_SALES,
  CLEAR_FILTER,
  SET_LOADING,
  GET_AMOUNTS,
} from '../../actions/types';
const initialState = {
  amounts: null,
  sales: [],
  quantity: null,
  total_amount: null,
  loading: false,
  error: null,
  filtered: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        sales: Object.values(action.payload.sale_item),
        quantity: action.payload.total_quantity,
        total_amount: action.payload.total_amount,

        loading: false,
      };

    case GET_SALES_NULL:
      return {
        ...state,
        sales: action.payload,
        loading: false,
      };
    case GET_AMOUNTS:
      return {
        ...state,
        amounts: action.payload,
        loading: false,
      };

    case FILTER_SALES:
      return {
        ...state,
        filtered: state.sales.filter((sale) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          if (sale.type_label) return sale.type_label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case SALES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
