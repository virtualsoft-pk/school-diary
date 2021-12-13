import {
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  ADD_BLOG,
  BLOG_ERROR,
  GET_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
  CATEGORY_LOADED,
  ADD_BLOG_CATEGORY,
  DELETE_BLOG_CATEGORY,
  CATEGORY_ERROR,
  FILTER_BLOGS,
  FILTER_CATEGORYS,
  CLEAR_CATEGORY_FILTER,
  CLEAR_FILTER,
  UPLOAD_FILE_ERROR,
} from '../../actions/types';

const initialState = {
  filteredCategory: null,
  categorys: null,
  loading: false,
  error: null,
  message: null,
  blogs: [],
  filtered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case CATEGORY_LOADED:
      return {
        ...state,
        loading: false,
        categorys: action.payload,
      };

    case ADD_BLOG_CATEGORY:
    case ADD_BLOG:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    // case UPLOAD_FILE:
    //   return {
    //     ...state,
    //     loading: false,
    //     blogImage: action.payload.data,
    //     message: action.payload.message,
    //   };
    case UPDATE_BLOG:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.map((blogs) =>
            blogs.id === action.payload.data.id ? action.payload.data : blogs
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case DELETE_BLOG:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (blogs) => blogs.id !== action.payload.data
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };

    case DELETE_BLOG_CATEGORY:
      if (
        state.filteredCategory !== null &&
        state.filteredCategory.length >= 0
      ) {
        return {
          ...state,
          filteredCategory: state.filteredCategory.filter(
            (categorys) => categorys.id !== action.payload.data
          ),
          message: action.payload.message,
          loading: false,
        };
      }
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };

    case FILTER_BLOGS:
      return {
        ...state,
        filtered: state.blogs.filter((blog) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return blog.title.match(regex);
        }),
      };
    case FILTER_CATEGORYS:
      return {
        ...state,
        filteredCategory: state.categorys.filter((category) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return category.label.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case CLEAR_CATEGORY_FILTER: 
      return {
        ...state,
        filteredCategory: null,
      };
    case UPLOAD_FILE_ERROR:
    case BLOG_ERROR:
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
