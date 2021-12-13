import {
  PRODUCT_REPORT_LOADED,
  PRODUCT_REPORT_ERROR,
  PRODUCT_REPORT_NULL,
  FILTER_PRODUCT_REPORT,
  CLEAR_FILTER,
  SET_LOADING,
  CLEAR_ERRORS,
} from '../../actions/types';

const initialState = {
  loading: false,
  error: null,
  products: [],
  filtered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_REPORT_LOADED:
      return {
        ...state,
        products: [
          ...Object.values(action.payload.products_new),
          ...Object.values(action.payload.products_old),
        ].sort((a, b) => {
          return new Date(b.created_on) - new Date(a.created_on);
        }),
        loading: false,
      };

    case PRODUCT_REPORT_NULL:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case FILTER_PRODUCT_REPORT:
      return {
        ...state,
        filtered: state.products.filter((product) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          if (product.type_label) return product.type_label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case PRODUCT_REPORT_ERROR:
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
