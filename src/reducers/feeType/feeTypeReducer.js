import {
  CLEAR_FEE_TYPE_ERRORS,
  SET_FEE_TYPE_LOADING,
  CLEAR_FEE_TYPE_MESSAGE,
  ADD_FEE_TYPE,
  FEE_TYPE_ERROR,
  GET_FEE_TYPES,
  UPDATE_FEE_TYPE,
  FILTER_FEE_TYPES,
  CLEAR_FEE_TYPE_FILTER,
} from '../../actions/types';

const initialState = {
  feeTypeLoading: false,
  error: null,
  message: null,
  feeTypes: [],
  feeTypeFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEE_TYPES:
      return {
        ...state,
        feeTypes: action.payload,
        feeTypeLoading: false,
      };

    case ADD_FEE_TYPE:
      return {
        ...state,
        message: action.payload.message,
        feeTypeLoading: false,
      };
    case UPDATE_FEE_TYPE:
      if (state.feeTypeFiltered !== null && state.feeTypeFiltered.length >= 0) {
        return {
          ...state,
          feeTypeFiltered: state.feeTypeFiltered.map((feeType) =>
            feeType.id === action.payload.data.id
              ? action.payload.data
              : feeType
          ),
          message: action.payload.message,
          feeTypeLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        feeTypeLoading: false,
      };
    case FILTER_FEE_TYPES:
      return {
        ...state,
        feeTypeFiltered: state.feeTypes.filter((feeType) => {
          return (
            JSON.stringify(feeType.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_FEE_TYPE_FILTER:
      return {
        ...state,
        feeTypeFiltered: null,
      };

    case FEE_TYPE_ERROR:
      return {
        ...state,
        feeTypeLoading: false,
        error: action.payload,
      };

    case CLEAR_FEE_TYPE_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_FEE_TYPE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_FEE_TYPE_LOADING:
      return {
        ...state,
        feeTypeLoading: true,
      };
    default:
      return state;
  }
};
