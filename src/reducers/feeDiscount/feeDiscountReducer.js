import {
    CLEAR_FEE_DISCOUNT_ERRORS,
    SET_FEE_DISCOUNT_LOADING,
    CLEAR_FEE_DISCOUNT_MESSAGE,
    ADD_FEE_DISCOUNT,
    FEE_DISCOUNT_ERROR,
    GET_FEE_DISCOUNT,
    UPDATE_FEE_DISCOUNT,
    FILTER_FEE_DISCOUNT,
    CLEAR_FEE_DISCOUNT_FILTER,
  } from '../../actions/types';
  
  const initialState = {
    feeDiscountLoading: false,
    error: null,
    message: null,
    feeDiscounts: [],
    feeDiscountFiltered: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_FEE_DISCOUNT:
        return {
          ...state,
          feeDiscounts: action.payload,
          feeDiscountLoading: false,
        };
  
      case ADD_FEE_DISCOUNT:
        return {
          ...state,
          message: action.payload.message,
          feeDiscountLoading: false,
        };
      case UPDATE_FEE_DISCOUNT:
        if (state.feeDiscountFiltered !== null && state.feeDiscountFiltered.length >= 0) {
          return {
            ...state,
            feeDiscountFiltered: state.feeDiscountFiltered.map((feeDis) =>
              feeDis.id === action.payload.data.id
                ? action.payload.data
                : feeDis
            ),
            message: action.payload.message,
            feeDiscountLoading: false,
          };
        }
        return {
          ...state,
          message: action.payload.message,
          feeDiscountLoading: false,
        };
      case FILTER_FEE_DISCOUNT:
        return {
          ...state,
          feeDiscountFiltered: state.feeDiscounts.filter((feeDis) => {
            return (
              JSON.stringify(feeDis.label)
                .toLowerCase()
                .indexOf(action.payload.toLowerCase()) !== -1
            );
          }),
        };
  
      case CLEAR_FEE_DISCOUNT_FILTER:
        return {
          ...state,
          feeDiscountFiltered: null,
        };
  
      case FEE_DISCOUNT_ERROR:
        return {
          ...state,
          feeDiscountLoading: false,
          error: action.payload,
        };
  
      case CLEAR_FEE_DISCOUNT_ERRORS:
        return {
          ...state,
          error: null,
        };
      case CLEAR_FEE_DISCOUNT_MESSAGE:
        return {
          ...state,
          message: null,
        };
      case SET_FEE_DISCOUNT_LOADING:
        return {
          ...state,
          feeDiscountLoading: true,
        };
      default:
        return state;
    }
  };
  