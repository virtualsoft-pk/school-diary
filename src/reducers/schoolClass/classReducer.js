import {
  CLEAR_CLASS_ERRORS,
  SET_CLASS_LOADING,
  CLEAR_CLASS_MESSAGE,
  ADD_CLASS,
  CLASS_ERROR,
  GET_CLASSES,
  UPDATE_CLASS,
  DELETE_CLASS,
  FILTER_CLASSES,
  CLEAR_CLASSES_FILTER,
} from '../../actions/types';

const initialState = {
  classLoading: false,
  error: null,
  message: null,
  classes: [],
  classFiltered: null,
  // viewclass: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload,
        classLoading: false,
      };

    case ADD_CLASS:
      return {
        ...state,
        message: action.payload.message,
        classLoading: false,
      };
    case UPDATE_CLASS:
      if (state.classFiltered !== null && state.classFiltered.length >= 0) {
        return {
          ...state,
          classFiltered: state.classFiltered.map((schoolClass) =>
            schoolClass.id === action.payload.data.id
              ? action.payload.data
              : schoolClass
          ),
          message: action.payload.message,
          classLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        classLoading: false,
      };
    // case VIEW_SCHOOL:
    //   return {
    //     ...state,
    //     viewclass: action.payload,
    //   };

    // case DELETE_CLASS:
    //   if (state.classFiltered !== null && state.classFiltered.length >= 0) {
    //     return {
    //       ...state,
    //       classFiltered: state.classFiltered.filter(
    //         (classes) => classes.id !== action.payload.data
    //       ),
    //       message: action.payload.message,
    //       classLoading: false,
    //     };
    //   }
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     classLoading: false,
    //   };

    case FILTER_CLASSES:
      return {
        ...state,
        classFiltered: state.classes.filter((schoolClass) => {
          return (
            JSON.stringify(schoolClass.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_CLASSES_FILTER:
      return {
        ...state,
        classFiltered: null,
      };

    case CLASS_ERROR:
      return {
        ...state,
        classLoading: false,
        error: action.payload,
      };

    case CLEAR_CLASS_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_CLASS_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_CLASS_LOADING:
      return {
        ...state,
        classLoading: true,
      };
    default:
      return state;
  }
};
