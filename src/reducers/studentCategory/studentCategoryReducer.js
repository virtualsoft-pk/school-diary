import {
    CLEAR_STUD_CAT_ERRORS,
    SET_STUD_CAT_LOADING,
    CLEAR_STUD_CAT_MESSAGE,
    ADD_STUD_CAT,
    STUD_CAT_ERROR,
    GET_STUD_CAT,
    UPDATE_STUD_CAT,
    FILTER_STUD_CAT,
    CLEAR_STUD_CAT_FILTER,
  } from '../../actions/types';
  
  const initialState = {
    studentCatLoading: false,
    error: null,
    message: null,
    studentCat: [],
    studentCatFiltered: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_STUD_CAT:
        return {
          ...state,
          studentCat: action.payload,
          studentCatLoading: false,
        };
  
      case ADD_STUD_CAT:
        return {
          ...state,
          message: action.payload.message,
          studentCatLoading: false,
        };
      case UPDATE_STUD_CAT:
        if (state.studentCatFiltered !== null && state.studentCatFiltered.length >= 0) {
          return {
            ...state,
            studentCatFiltered: state.studentCatFiltered.map((studCat) =>
              studCat.id === action.payload.data.id
                ? action.payload.data
                : studCat
            ),
            message: action.payload.message,
            studentCatLoading: false,
          };
        }
        return {
          ...state,
          message: action.payload.message,
          studentCatLoading: false,
        };
      case FILTER_STUD_CAT:
        return {
          ...state,
          studentCatFiltered: state.studentCat.filter((studCat) => {
            return (
              JSON.stringify(studCat.label)
                .toLowerCase()
                .indexOf(action.payload.toLowerCase()) !== -1
            );
          }),
        };
  
      case CLEAR_STUD_CAT_FILTER:
        return {
          ...state,
          studentCatFiltered: null,
        };
  
      case STUD_CAT_ERROR:
        return {
          ...state,
          studentCatLoading: false,
          error: action.payload,
        };
  
      case CLEAR_STUD_CAT_ERRORS:
        return {
          ...state,
          error: null,
        };
      case CLEAR_STUD_CAT_MESSAGE:
        return {
          ...state,
          message: null,
        };
      case SET_STUD_CAT_LOADING:
        return {
          ...state,
          studentCatLoading: true,
        };
      default:
        return state;
    }
  };
  