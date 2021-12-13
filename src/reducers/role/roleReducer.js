import {
  CLEAR_ROLE_ERRORS,
  SET_ROLE_LOADING,
  CLEAR_ROLE_MESSAGE,
  ADD_ROLE,
  ROLE_ERROR,
  GET_ROLES,
  UPDATE_ROLE,
  DELETE_ROLE,
  FILTER_ROLES,
  CLEAR_ROLES_FILTER,
} from '../../actions/types';

const initialState = {
  roleLoading: false,
  error: null,
  message: null,
  roles: [],
  roleFiltered: null,
  // viewRole: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        roleLoading: false,
      };

    case ADD_ROLE:
      return {
        ...state,
        message: action.payload.message,
        roleLoading: false,
      };
    case UPDATE_ROLE:
      if (state.roleFiltered !== null && state.roleFiltered.length >= 0) {
        return {
          ...state,
          roleFiltered: state.roleFiltered.map((role) =>
            role.id === action.payload.data.id ? action.payload.data : role
          ),
          message: action.payload.message,
          roleLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        roleLoading: false,
      };
    // case VIEW_SCHOOL:
    //   return {
    //     ...state,
    //     viewRole: action.payload,
    //   };

    // case DELETE_ROLE:
    //   if (state.roleFiltered !== null && state.roleFiltered.length >= 0) {
    //     return {
    //       ...state,
    //       roleFiltered: state.roleFiltered.filter(
    //         (roles) => roles.id !== action.payload.data
    //       ),
    //       message: action.payload.message,
    //       roleLoading: false,
    //     };
    //   }
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     roleLoading: false,
    //   };

    case FILTER_ROLES:
      return {
        ...state,
        roleFiltered: state.roles.filter((role) => {
          return (
            JSON.stringify(role.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };
    case CLEAR_ROLES_FILTER:
      return {
        ...state,
        roleFiltered: null,
      };

    case ROLE_ERROR:
      return {
        ...state,
        roleLoading: false,
        error: action.payload,
      };

    case CLEAR_ROLE_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ROLE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_ROLE_LOADING:
      return {
        ...state,
        roleLoading: true,
      };
    default:
      return state;
  }
};
