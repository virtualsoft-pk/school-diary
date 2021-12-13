import {
  CLEAR_EMAIL_LOG_ERRORS,
  SET_EMAIL_LOG_LOADING,
  CLEAR_EMAIL_LOG_MESSAGE,
  ADD_EMAIL_LOG,
  EMAIL_LOG_ERROR,
  GET_EMAIL_LOGS,
  UPDATE_EMAIL_LOG,
  FILTER_EMAIL_LOGS,
  CLEAR_EMAIL_LOG_FILTER,
} from '../../actions/types';

const initialState = {
  emailLogLoading: false,
  error: null,
  message: null,
  emailLogs: [],
  emailLogFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMAIL_LOGS:
      return {
        ...state,
        emailLogs: action.payload,
        emailLogLoading: false,
      };

    case ADD_EMAIL_LOG:
      return {
        ...state,
        message: action.payload.message,
        emailLogLoading: false,
      };
    case UPDATE_EMAIL_LOG:
      if (
        state.emailLogFiltered !== null &&
        state.emailLogFiltered.length >= 0
      ) {
        return {
          ...state,
          emailLogFiltered: state.emailLogFiltered.map((emailLog) =>
            emailLog.id === action.payload.data.id
              ? action.payload.data
              : emailLog
          ),
          message: action.payload.message,
          emailLogLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        emailLogLoading: false,
      };
    case FILTER_EMAIL_LOGS:
      return {
        ...state,
        emailLogFiltered: state.emailLogs.filter((emailLog) => {
          return (
            JSON.stringify(emailLog.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_EMAIL_LOG_FILTER:
      return {
        ...state,
        emailLogFiltered: null,
      };

    case EMAIL_LOG_ERROR:
      return {
        ...state,
        emailLogLoading: false,
        error: action.payload,
      };

    case CLEAR_EMAIL_LOG_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_EMAIL_LOG_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_EMAIL_LOG_LOADING:
      return {
        ...state,
        emailLogLoading: true,
      };
    default:
      return state;
  }
};
