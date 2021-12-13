import {
  CLEAR_FEE_MASTER_ERRORS,
  SET_FEE_MASTER_LOADING,
  CLEAR_FEE_MASTER_MESSAGE,
  ADD_FEE_MASTER,
  FEE_MASTER_ERROR,
  GET_FEE_MASTER,
  UPDATE_FEE_MASTER,
  FILTER_FEE_MASTER,
  CLEAR_FEE_MASTER_FILTER,
} from '../../actions/types';

const initialState = {
  feeMasterLoading: false,
  error: null,
  message: null,
  feeMasters: [],
  feeMasterFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEE_MASTER:
      return {
        ...state,
        feeMasters: action.payload,
        feeMasterLoading: false,
      };

    case ADD_FEE_MASTER:
      return {
        ...state,
        message: action.payload.message,
        feeMasterLoading: false,
      };
    case UPDATE_FEE_MASTER:
      if (
        state.feeMasterFiltered !== null &&
        state.feeMasterFiltered.length >= 0
      ) {
        return {
          ...state,
          feeMasterFiltered: state.feeMasterFiltered.map((feeMaster) =>
            feeMaster.id === action.payload.data.id
              ? action.payload.data
              : feeMaster
          ),
          message: action.payload.message,
          feeMasterLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        feeMasterLoading: false,
      };
    case FILTER_FEE_MASTER:
      return {
        ...state,
        feeMasterFiltered: state.feeMasters.filter((feeMaster) => {
          return (
            JSON.stringify(feeMaster.class)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_FEE_MASTER_FILTER:
      return {
        ...state,
        feeMasterFiltered: null,
      };

    case FEE_MASTER_ERROR:
      return {
        ...state,
        feeMasterLoading: false,
        error: action.payload,
      };

    case CLEAR_FEE_MASTER_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_FEE_MASTER_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_FEE_MASTER_LOADING:
      return {
        ...state,
        feeMasterLoading: true,
      };
    default:
      return state;
  }
};
