import {
  GET_PACKAGES,
  ADD_PACKAGE,
  UPDATE_PACKAGE,
  PACKAGE_ERROR,
  CLEAR_PACKAGE_FILTER,
  SET_PACKAGE_LOADING,
  CLEAR_PACKAGE_ERRORS,
  CLEAR_PACKAGE_MESSAGE,
  PACKAGE_DETAILS,
} from '../../actions/types';

const initialState = {
  packageLoading: false,
  error: null,
  message: null,
  packages: [],
  packageFiltered: null,
  packageDetail: null,
  packageCards: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.payload.data,
        packageCards: action.payload.cards_data,
        packageLoading: false,
      };
    case PACKAGE_DETAILS:
      return {
        ...state,
        packageDetail: action.payload,
        packageLoading: false,
      };
    case ADD_PACKAGE:
      return {
        ...state,
        message: action.payload.message,
        packageLoading: false,
      };
    case UPDATE_PACKAGE:
      if (state.packageFiltered !== null && state.packageFiltered.length >= 0) {
        return {
          ...state,
          packageFiltered: state.packageFiltered.map((packages) =>
            packages.id === action.payload.data.id
              ? action.payload.data
              : packages
          ),
          message: action.payload.message,
          packageLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        packageLoading: false,
      };

    // case FILTER_PACKAGE:
    //   return {
    //     ...state,
    //     packageFiltered: state.schools.filter((packages) => {
    //       const regex = new RegExp(`${action.payload}`, 'gi');
    //       return packages.name.match(regex);
    //     }),
    //   };

    case CLEAR_PACKAGE_FILTER:
      return {
        ...state,
        packageFiltered: null,
      };

    case PACKAGE_ERROR:
      return {
        ...state,
        packageLoading: false,
        error: action.payload,
      };

    case CLEAR_PACKAGE_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_PACKAGE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_PACKAGE_LOADING:
      return {
        ...state,
        packageLoading: true,
      };
    default:
      return state;
  }
};
