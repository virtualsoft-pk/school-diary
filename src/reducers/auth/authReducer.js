import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_LOGIN_ERRORS,
  LOGOUT,
  SET_LOGIN_LOADING,
  CLEAR_LOGIN_MESSAGE,
  FORGET_REQUEST,
  REQUEST_ERROR,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_IMAGE,
  CHANGE_IMAGE_ERROR,
  UPDATE_ADMIN,
  UPDATE_ADMIN_ERROR,
  CHANGE_DARK_MODE,
} from '../../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated:
    localStorage.getItem('token') && localStorage.getItem('token') !== undefined
      ? true
      : false,
  loginLoading: false,
  userId: null,
  user: null,
  userType: localStorage.getItem('userType'),
  error: null,
  message: null,
  dark_mode:
    localStorage.getItem('layout_version') &&
    localStorage.getItem('layout_version') !== undefined &&
    localStorage.getItem('layout_version') === 'dark-only'
      ? 'dark-only'
      : 'light',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);

      return {
        ...state,
        ...action.payload.data,
        isAdmin: action.payload.admin,
        isAuthenticated: true,
        loginLoading: false,
        message: action.payload.message,
        error: null,
      };

    case USER_LOADED:
      localStorage.setItem('userType', action.payload.user_type);
      return {
        ...state,
        isAuthenticated: true,
        loginLoading: false,
        userId: action.payload.id,
        userType: action.payload.user_type,
        user: action.payload.data,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('layout_version');
      return {
        ...state,
        token: null,
        isAdmin: null,
        isAuthenticated: false,
        loginLoading: false,
        user: null,
        userId: null,
        userType: null,
        error: action.payload,
        dark_mode: 'light',
      };
    case RESET_PASSWORD:
    case FORGET_REQUEST:
      return {
        ...state,
        message: action.payload.message,
      };
    case CHANGE_PASSWORD:
    case CHANGE_IMAGE:
    case UPDATE_ADMIN:
      return {
        ...state,
        message: action.payload.message,
        loginLoading: false,
      };
    case CHANGE_PASSWORD_ERROR:
    case CHANGE_IMAGE_ERROR:
    case UPDATE_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loginLoading: false,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_LOGIN_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case CHANGE_DARK_MODE:
      localStorage.setItem('layout_version', action.payload);
      return {
        ...state,
        dark_mode: action.payload,
        lodaing: false,
      };
    default:
      return state;
  }
};
