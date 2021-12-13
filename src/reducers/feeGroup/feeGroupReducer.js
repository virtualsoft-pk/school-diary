import {
  CLEAR_FEE_GROUP_ERRORS,
  SET_FEE_GROUP_LOADING,
  CLEAR_FEE_GROUP_MESSAGE,
  ADD_FEE_GROUP,
  FEE_GROUP_ERROR,
  GET_FEE_GROUPS,
  UPDATE_FEE_GROUP,
  FILTER_FEE_GROUPS,
  CLEAR_FEE_GROUP_FILTER,
} from '../../actions/types';

const initialState = {
  feeGroupLoading: false,
  error: null,
  message: null,
  feeGroups: [],
  feeGroupFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEE_GROUPS:
      return {
        ...state,
        feeGroups: action.payload,
        feeGroupLoading: false,
      };

    case ADD_FEE_GROUP:
      return {
        ...state,
        message: action.payload.message,
        feeGroupLoading: false,
      };
    case UPDATE_FEE_GROUP:
      if (
        state.feeGroupFiltered !== null &&
        state.feeGroupFiltered.length >= 0
      ) {
        return {
          ...state,
          feeGroupFiltered: state.feeGroupFiltered.map((feeGroup) =>
            feeGroup.id === action.payload.data.id
              ? action.payload.data
              : feeGroup
          ),
          message: action.payload.message,
          feeGroupLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        feeGroupLoading: false,
      };
    case FILTER_FEE_GROUPS:
      return {
        ...state,
        feeGroupFiltered: state.feeGroups.filter((feeGroup) => {
          return (
            JSON.stringify(feeGroup.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_FEE_GROUP_FILTER:
      return {
        ...state,
        feeGroupFiltered: null,
      };

    case FEE_GROUP_ERROR:
      return {
        ...state,
        feeGroupLoading: false,
        error: action.payload,
      };

    case CLEAR_FEE_GROUP_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_FEE_GROUP_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_FEE_GROUP_LOADING:
      return {
        ...state,
        feeGroupLoading: true,
      };
    default:
      return state;
  }
};
