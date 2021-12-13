import {
  GET_SCHOOLS,
  ADD_SCHOOL,
  UPDATE_SCHOOL,
  SCHOOL_ERROR,
  FILTER_SCHOOLS,
  CLEAR_SCHOOLS_FILTER,
  SET_SCHOOL_LOADING,
  CLEAR_SCHOOL_ERRORS,
  CLEAR_SCHOOL_MESSAGE,
  VIEW_SCHOOL,
  GET_SUBSCRIPTION_HISTORY,
  GET_COUNTRIES,
  COUNTRIES_ERROR,
  GET_STATES,
  STATES_ERROR,
  GET_CITIES,
  CITIES_ERROR,
  UPLOAD_IMAGE_ERROR,
} from '../../actions/types';

const initialState = {
  schoolLoading: false,
  error: null,
  message: null,
  schools: null,
  schoolDetail: null,
  schoolFiltered: null,
  totalSchools: null,
  totalStudents: null,
  renewRequest: null,
  subscriptionHistory: null,
  countries: null,
  states: null,
  cities: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        schoolLoading: false,
      };
    case GET_STATES:
      return {
        ...state,
        states: action.payload,
        schoolLoading: false,
      };
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        schoolLoading: false,
      };
    case GET_SCHOOLS:
      return { 
        ...state,
        schools: action.payload.data,
        schoolLoading: false,
        totalSchools: action.payload.school_count.schools_count,
        totalStudents: action.payload.student_count.students_count,
        renewRequest: action.payload.renew_requests
      };

    case ADD_SCHOOL:
      return {
        ...state,
        message: action.payload.message,
        schoolLoading: false,
      };
    case UPDATE_SCHOOL:
      if (state.schoolFiltered !== null && state.schoolFiltered.length >= 0) {
        return {
          ...state,
          schoolFiltered: state.schoolFiltered.map((school) =>
            school.id === action.payload.data.id ? action.payload.data : school
          ),
          message: action.payload.message,
          schoolLoading: false,
        };
      }
      return { 
        ...state,
        message: action.payload.message,
        schoolLoading: false,
      };
    case VIEW_SCHOOL:
      return {
        ...state,
        schoolDetail: action.payload,
        schoolLoading: false,
      };
    case GET_SUBSCRIPTION_HISTORY:
      return {
        ...state,
        subscriptionHistory: action.payload,
        schoolLoading: false,
      };

    case FILTER_SCHOOLS:
      return {
        ...state,
        schoolFiltered: state.schools.filter((school) => {
          return (JSON.stringify(school.name)
          .toLowerCase()
          .indexOf(action.payload.toLowerCase()) !== -1) 
          // const regex = new RegExp(`${action.payload}`, 'gi');
          // return school.name.match(regex);
        }),
      };

    case CLEAR_SCHOOLS_FILTER:
      return {
        ...state,
        schoolFiltered: null,
      };
    case COUNTRIES_ERROR:
    case STATES_ERROR:
    case CITIES_ERROR:
    case SCHOOL_ERROR:
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        schoolLoading: false,
        error: action.payload,
      };

    case CLEAR_SCHOOL_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SCHOOL_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_SCHOOL_LOADING:
      return {
        ...state,
        schoolLoading: true,
      };
    default:
      return state;
  }
};
