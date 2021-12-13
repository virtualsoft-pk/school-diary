import {
  GET_QUERIES,
  QUERIES_REPLY,
  QUERY_ERROR,
  FILTER_QUERIES,
  CLEAR_QUERIES_FILTER,
  SET_QUERY_LOADING,
  CLEAR_QUERY_ERRORS,
  CLEAR_QUERY_MESSAGE,
  DELETE_QUERY,
} from '../../actions/types';

const initialState = {
  queryLoading: false,
  error: null,
  message: null,
  queries: null,
  queriesFiltered: null,
  viewQuery: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERIES:
      return {
        ...state,
        queries: action.payload,
        queryLoading: false,
      };

    case QUERIES_REPLY:
      return {
        ...state,
        message: action.payload.message,
        queryLoading: false,
      };
    case DELETE_QUERY:
      if (state.queriesFiltered !== null && state.queriesFiltered.length >= 0) {
        return {
          ...state,
          queriesFiltered: state.queriesFiltered.filter(
            (query) => query.id !== action.payload.data
          ),
          message: action.payload.message,
          queryLoading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        queryLoading: false,
      };
    case FILTER_QUERIES:
      return {
        ...state,
        queriesFiltered: state.queries.filter((query) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return query.name.match(regex);
        }),
      };

    case CLEAR_QUERIES_FILTER:
      return {
        ...state,
        queriesFiltered: null,
      };

    case QUERY_ERROR:
      return {
        ...state,
        queryLoading: false,
        error: action.payload,
      };

    case CLEAR_QUERY_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_QUERY_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_QUERY_LOADING:
      return {
        ...state,
        queryLoading: true,
      };
    default:
      return state;
  }
};
