import {
  CLEAR_SALES_PERSONS_ERRORS,
  SET_SALES_PERSONS_LOADING,
  CLEAR_SALES_PERSONS_MESSAGE,
  ADD_SALES_PERSONS,
  SALES_PERSONS_ERROR,
  GET_SALES_PERSONS,
  UPDATE_SALES_PERSONS,
  FILTER_SALES_PERSONS,
  CLEAR_SALES_PERSONS_FILTER,
} from '../../actions/types';

const initialState = {
  salesPersonsLoading: false,
  error: null,
  message: null,
  salesPersons: null,
  salesPersonsFiltered: null,
  // viewRole: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_PERSONS:
      return {
        ...state,
        salesPersons: action.payload,
        salesPersonsLoading: false,
      };

    case ADD_SALES_PERSONS:
      return {
        ...state,
        message: action.payload.message,
        salesPersonsLoading: false,
      };
    case UPDATE_SALES_PERSONS:
      if (state.salesPersonsFiltered !== null && state.salesPersonsFiltered.length >= 0) {

        return { 
          ...state,
          salesPersonsFiltered: state.salesPersonsFiltered.map((person) =>
            person.id === action.payload.data.id ? action.payload.data : person
          ),
          message: action.payload.message,
          salesPersonsLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        salesPersonsLoading: false,
      };

    case FILTER_SALES_PERSONS:
      return {
        ...state,
        salesPersonsFiltered: state.salesPersons.filter((person) => {
          return (JSON.stringify(person.name)
          .toLowerCase()
          .indexOf(action.payload.toLowerCase()) !== -1) 
          // const regex = new RegExp(`${action.payload}`, 'gi');
          // return person.name.match(regex);
        }),
      };

    case CLEAR_SALES_PERSONS_FILTER:
      return {
        ...state,
        salesPersonsFiltered: null,
      };

    case SALES_PERSONS_ERROR:
      return {
        ...state,
        salesPersonsLoading: false,
        error: action.payload,
      };

    case CLEAR_SALES_PERSONS_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SALES_PERSONS_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_SALES_PERSONS_LOADING:
      return {
        ...state,
        salesPersonsLoading: true,
      };
    default:
      return state;
  }
};
