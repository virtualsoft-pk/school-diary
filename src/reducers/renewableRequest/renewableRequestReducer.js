import {
  GET_RENEWABLE_REQUEST,
  ADD_RENEWABLE_REQUEST,
  UPDATE_RENEWABLE_REQUEST,
  RENEWABLE_REQUEST_ERROR,
  FILTER_RENEWABLE_REQUEST,
  CLEAR_RENEWABLE_REQUEST_FILTER,
  SET_RENEWABLE_REQUEST_LOADING,
  CLEAR_RENEWABLE_REQUEST_ERRORS,
  CLEAR_RENEWABLE_REQUEST_MESSAGE,
} from '../../actions/types';

const initialState = {
  renewableRequestLoading: false,
  error: null,
  message: null,
  renewableRequests: [],
  counterData: [],
  totalCount: null,
  renewableRequestFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RENEWABLE_REQUEST:
      return {
        ...state,
        renewableRequests: action.payload.data,
        counterData: [
          ...action.payload.counter_data,
          { count: action.payload.total, package: 'Total' },
        ],
        totalCount: action.payload.total,
        renewableRequestLoading: false,
      };
    case ADD_RENEWABLE_REQUEST:
      return {
        ...state,
        message: action.payload.message,
        renewableRequestLoading: false,
      };
    // case ADD_RENEWABLE_REQUEST:
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     renewableRequestLoading: false,
    //   };
    // case UPDATE_RENEWABLE_REQUEST:
    //   if (
    //     state.renewableRequestFiltered !== null &&
    //     state.renewableRequestFiltered.length >= 0
    //   ) {
    //     return {
    //       ...state,
    //       renewableRequestFiltered: state.renewableRequestFiltered.map(
    //         (renewableRequests) =>
    //           renewableRequests.id === action.payload.data.id
    //             ? action.payload.data
    //             : renewableRequests
    //       ),
    //       message: action.payload.message,
    //       renewableRequestLoading: false,
    //     };
    //   }
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     renewableRequestLoading: false,
    //   };

    case FILTER_RENEWABLE_REQUEST:
      return {
        ...state,
        renewableRequestFiltered: state.renewableRequests.filter(
          (renewableRequests) => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return renewableRequests.country.match(regex);
            //   ||renewableRequests.school_name.match(regex)
          }
        ),
      };

    case CLEAR_RENEWABLE_REQUEST_FILTER:
      return {
        ...state,
        renewableRequestFiltered: null,
      };

    case RENEWABLE_REQUEST_ERROR:
      return {
        ...state,
        renewableRequestLoading: false,
        error: action.payload,
      };

    case CLEAR_RENEWABLE_REQUEST_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_RENEWABLE_REQUEST_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_RENEWABLE_REQUEST_LOADING:
      return {
        ...state,
        renewableRequestLoading: true,
      };
    default:
      return state;
  }
};
