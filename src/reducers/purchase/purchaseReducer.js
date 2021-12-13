import {
  PURCHASE_LOADED,
  NEW_PURCHASE,
  OLD_PURCHASE,
  TYPES_LOADED,
  TYPES_ERROR,
  PURCHASE_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  // FILTER_PURCHASE,
  // CLEAR_FILTER,
  CLEAR_FILTER_TYPE,
  RETURN_PURCHASE,
  UPDATE_PURCHASE,
  FILTER_PURCHASE_TYPE,
  DELETE_PURCHASE,
  PURCHASE_RETURN_LOADED,
  CLEAR_PURCHASE_RETURN,
} from '../../actions/types';

const initialState = {
  purchases: null,
  purchasesReturn: null,
  types: null,
  filtered: null,
  // filteredType: null,
  loading: false,
  error: null,
  message: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_LOADED:
      return {
        ...state,
        purchases: [
          ...Object.values(action.payload.new),
          ...Object.values(action.payload.old),
        ].sort((a, b) => {
          return new Date(b.created_on) - new Date(a.created_on);
        }),
        loading: false,
      };
    case TYPES_LOADED:
      return {
        ...state,
        loading: false,
        types: action.payload,
      };

    case PURCHASE_RETURN_LOADED:
      return {
        ...state,
        purchasesReturn: [
          ...Object.values(action.payload.purchase_list),
          ...Object.values(action.payload.purchase_list_old),
        ].sort((a, b) => {
          return new Date(b.created_on) - new Date(a.created_on);
        }),
        loading: false,
      };
    case NEW_PURCHASE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case OLD_PURCHASE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case RETURN_PURCHASE:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.map((purchase) =>
            purchase.id === action.payload.data.id
              ? action.payload.data
              : purchase
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case UPDATE_PURCHASE:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.map((purchase) =>
            purchase.id === action.payload.data.id
              ? action.payload.data
              : purchase
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case DELETE_PURCHASE:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (purchase) => purchase.id !== action.payload.data
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case TYPES_ERROR:
    case PURCHASE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case FILTER_PURCHASE_TYPE:
      return {
        ...state,
        filtered: state.purchases.filter((purchase) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return purchase.type.match(regex);
        }),
      };

    // case FILTER_PURCHASE:
    //   return {
    //     ...state,
    //     filtered: state.purchases.filter((purchase) => {
    //       const regex = new RegExp(`${action.payload}`, 'gi');
    //       return purchase.product_name.match(regex);
    //     }),
    //     loading: false,
    //   };

    // case CLEAR_FILTER:
    //   return {
    //     ...state,
    //     filtered: null,
    //   };

    case CLEAR_FILTER_TYPE:
      return {
        ...state,
        filtered: null,
      };

    case CLEAR_PURCHASE_RETURN:
      return {
        ...state,
        purchasesReturn: null,
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
