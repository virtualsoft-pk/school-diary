import {
  GET_CITY_SCHOOLS,
  CITY_SCHOOLS_ERROR,
  FILTER_CITY_SCHOOLS,
  CLEAR_CITY_SCHOOLS_FILTER,
  SET_CITY_SCHOOLS_LOADING,
  CLEAR_CITY_SCHOOLS_ERRORS,
  CLEAR_CITY_SCHOOLS_MESSAGE,
} from '../../actions/types';

const initialState = {
  schoolLoading: false,
  error: null,
  message: null,
  schools: null,
  schoolFiltered: null,
  totalSchools: null,
  totalStudents: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY_SCHOOLS:
      return {
        ...state,
        schools: action.payload.schools,
        schoolLoading: false,
        totalSchools: action.payload.schools_count,
        totalStudents: action.payload.student_counts,
      };

    case FILTER_CITY_SCHOOLS:
      return {
        ...state,
        schoolFiltered: state.schools.filter((school) => {
          return (
            JSON.stringify(school.name)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
          // const regex = new RegExp(`${action.payload}`, 'gi');
          // return school.name.match(regex);
        }),
      };

    case CLEAR_CITY_SCHOOLS_FILTER:
      return {
        ...state,
        schoolFiltered: null,
      };
    case CITY_SCHOOLS_ERROR:
      return {
        ...state,
        schoolLoading: false,
        error: action.payload,
      };

    case CLEAR_CITY_SCHOOLS_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_CITY_SCHOOLS_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_CITY_SCHOOLS_LOADING:
      return {
        ...state,
        schoolLoading: true,
      };
    default:
      return state;
  }
};
