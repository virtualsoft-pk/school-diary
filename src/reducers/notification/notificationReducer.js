import {
  GET_NOTIFICATION,
  NOTIFICATION_ERROR,
  SET_NOTIFICATION_LOADING,
  CLEAR_NOTIFICATION_ERRORS,
  CLEAR_NOTIFICATION_MESSAGE,
  UPDATE_NOTIFICATION,
} from '../../actions/types';

const initialState = {
  notifications: null,
  error: null,
  message: null,
  notificationLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload.data[0],
        message: action.payload.message,
        notificationLoading: false,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
        notificationLoading: false,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload,
        notificationLoading: false,
      };
    case CLEAR_NOTIFICATION_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_NOTIFICATION_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_NOTIFICATION_LOADING:
      return {
        ...state,
        notificationLoading: true,
      };
    default:
      return state;
  }
};
