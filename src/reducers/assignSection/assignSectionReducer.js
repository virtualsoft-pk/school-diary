import {
  CLEAR_ASSIGN_SECTION_ERRORS,
  SET_ASSIGN_SECTION_LOADING,
  CLEAR_ASSIGN_SECTION_MESSAGE,
  ADD_ASSIGN_SECTION,
  ASSIGN_SECTION_ERROR,
  GET_ASSIGN_SECTIONS,
  UPDATE_ASSIGN_SECTION,
  FILTER_ASSIGN_SECTIONS,
  CLEAR_ASSIGN_SECTION_FILTER,
} from '../../actions/types';

const initialState = {
  assignSectionLoading: false,
  error: null,
  message: null,
  assignSections: [],
  assignSectionFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGN_SECTIONS:
      return {
        ...state,
        assignSections: action.payload,
        assignSectionLoading: false,
      };

    case ADD_ASSIGN_SECTION:
      return {
        ...state,
        message: action.payload.message,
        assignSectionLoading: false,
      };
    case UPDATE_ASSIGN_SECTION:
      if (
        state.assignSectionFiltered !== null &&
        state.assignSectionFiltered.length >= 0
      ) {
        return {
          ...state,
          assignSectionFiltered: state.assignSectionFiltered.map((section) =>
            section.id === action.payload.data.id
              ? action.payload.data
              : section
          ),
          message: action.payload.message,
          assignSectionLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        assignSectionLoading: false,
      };
    case FILTER_ASSIGN_SECTIONS:
      return {
        ...state,
        assignSectionFiltered: state.assignSections.filter((section) => {
          return (
            JSON.stringify(section.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_ASSIGN_SECTION_FILTER:
      return {
        ...state,
        assignSectionFiltered: null,
      };

    case ASSIGN_SECTION_ERROR:
      return {
        ...state,
        assignSectionLoading: false,
        error: action.payload,
      };

    case CLEAR_ASSIGN_SECTION_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ASSIGN_SECTION_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_ASSIGN_SECTION_LOADING:
      return {
        ...state,
        assignSectionLoading: true,
      };
    default:
      return state;
  }
};
