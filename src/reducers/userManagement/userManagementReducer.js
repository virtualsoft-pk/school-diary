import {
  GET_SUB_ADMIN,
  SUB_ADMIN_ERROR,
  ADD_SUB_ADMIN,
  UPDATE_SUB_ADMIN,
  DELETE_SUB_ADMIN,
  SET_SUB_ADMIN_LOADING,
  CLEAR_SUB_ADMIN_ERRORS,
  CLEAR_SUB_ADMIN_MESSAGE,
  ALLOW_ACCESS,
  ADMIN_DATA_ERROR,
  GET_ADMIN_DATA,
  USER_ROLES_ERROR,
  FILTER_USERS,
  CLEAR_USER_FILTER,
} from '../../actions/types';

const initialState = {
  subAdmins: null,
  selectedSubAdmin: null,
  subAdminFiltered: null,
  error: null,
  message: null,
  subAdminLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_ADMIN:
      return {
        ...state,
        subAdmins: action.payload,
        subAdminLoading: false,
      };
    case GET_ADMIN_DATA:
      return {
        ...state,
        selectedSubAdmin: action.payload,
        subAdminLoading: false,
      };
    case ADD_SUB_ADMIN:
    case ALLOW_ACCESS:
    case UPDATE_SUB_ADMIN:
    case DELETE_SUB_ADMIN:
      return {
        ...state,
        message: action.payload.message,
        subAdminLoading: false,
      };
    case SUB_ADMIN_ERROR:
    case ADMIN_DATA_ERROR:
    case USER_ROLES_ERROR:
      return {
        ...state,
        error: action.payload,
        subAdminLoading: false,
      };
    case FILTER_USERS:
      return {
        ...state,
        subAdminFiltered: state.subAdmins.filter((admin) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return admin.name.match(regex);
        }),
        subAdminLoading: false,
      };
    case CLEAR_USER_FILTER:
      return {
        ...state,
        subAdminFiltered: null,
      };
    case CLEAR_SUB_ADMIN_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUB_ADMIN_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_SUB_ADMIN_LOADING:
      return {
        ...state,
        subAdminLoading: true,
      };
    default:
      return state;
  }
};
