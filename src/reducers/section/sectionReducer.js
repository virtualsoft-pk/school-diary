import {
  CLEAR_SECTION_ERRORS,
  SET_SECTION_LOADING,
  CLEAR_SECTION_MESSAGE,
  ADD_SECTION,
  SECTION_ERROR,
  GET_SECTIONS,
  UPDATE_SECTION,
  FILTER_SECTIONS,
  CLEAR_SECTION_FILTER,
  GET_CLASS_SECTIONS
} from '../../actions/types';

const initialState = {
  sectionLoading: false,
  error: null,
  message: null,
  classSections: [],
  sections: [],
  sectionFiltered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
        sectionLoading: false,
      };
    case GET_CLASS_SECTIONS:
      return {
        ...state,
        classSections: action.payload,
        sectionLoading: false,
      };
    case ADD_SECTION:
      return {
        ...state,
        message: action.payload.message,
        sectionLoading: false,
      };
    case UPDATE_SECTION:
      if (state.sectionFiltered !== null && state.sectionFiltered.length >= 0) {
        return {
          ...state,
          sectionFiltered: state.sectionFiltered.map((section) =>
            section.id === action.payload.data.id
              ? action.payload.data
              : section
          ),
          message: action.payload.message,
          sectionLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        sectionLoading: false,
      };
    case FILTER_SECTIONS:
      return {
        ...state,
        sectionFiltered: state.sections.filter((section) => {
          return (
            JSON.stringify(section.label)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_SECTION_FILTER:
      return {
        ...state,
        sectionFiltered: null,
      };

    case SECTION_ERROR:
      return {
        ...state,
        sectionLoading: false,
        error: action.payload,
      };

    case CLEAR_SECTION_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SECTION_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_SECTION_LOADING:
      return {
        ...state,
        sectionLoading: true,
      };
    default:
      return state;
  }
};
