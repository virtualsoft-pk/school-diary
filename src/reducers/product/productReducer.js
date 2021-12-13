import {
  PRODUCT_LOADED,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  FILTER_PRODUCTS,
  CLEAR_FILTER,
  MAKES_LOADED,
  FILTER_MAKE,
  ADD_MAKE,
  DELETE_MAKE,
  MAKES_ERROR,
  MODEL_LOADED,
  FILTER_MODEL,
  ADD_MODEL,
  DELETE_MODEL,
  MODEL_ERROR,
  CATEGORY_LOADED,
  FILTER_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  SUBCATEGORY_LOADED,
  ADD_SUBCATEGORY,
  FILTER_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  SUBCATEGORY_ERROR,
  UPLOAD_FILE,
  CLEAR_FILE,
  UPLOAD_FILE_ERROR,
  UPDATE_SUB_CATEGORY,
  UPDATE_MAKE,
  UPDATE_MODEL,
} from '../../actions/types';

const initialState = {
  products: null,
  makes: null,
  models: null,
  categories: null,
  subcategories: null,
  filtered: null,
  loading: false,
  error: null,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADED:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case MAKES_LOADED:
      return {
        ...state,
        loading: false,
        makes: action.payload,
      };
    case MODEL_LOADED:
      return {
        ...state,
        loading: false,
        models: action.payload,
      };
    case CATEGORY_LOADED:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case SUBCATEGORY_LOADED:
      return {
        ...state,
        loading: false,
        subcategories: action.payload,
      };
    case ADD_PRODUCT:
    case ADD_MAKE:
    case ADD_MODEL:
    case ADD_CATEGORY:
    case ADD_SUBCATEGORY:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case UPDATE_CATEGORY:
    case UPDATE_SUB_CATEGORY:
    case UPDATE_MAKE:
    case UPDATE_MODEL:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case UPDATE_PRODUCT:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.map((product) =>
            product.id === action.payload.data.id
              ? action.payload.data
              : product
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
    case DELETE_PRODUCT:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (product) => product.id !== action.payload.data
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
    case DELETE_MAKE:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (make) => make.id !== action.payload.data
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
    case DELETE_MODEL:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (model) => model.id !== action.payload.data
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
    case DELETE_CATEGORY:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (category) => category.id !== action.payload.data
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
    case DELETE_SUB_CATEGORY:
      if (state.filtered !== null && state.filtered.length >= 0) {
        return {
          ...state,
          filtered: state.filtered.filter(
            (sub_cat) => sub_cat.id !== action.payload.data
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
    case PRODUCT_ERROR:
    case MAKES_ERROR:
    case MODEL_ERROR:
    case CATEGORY_ERROR:
    case SUBCATEGORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: state.products.filter((product) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return product.label.match(regex);
        }),
        loading: false,
      };
    case FILTER_MAKE:
      return {
        ...state,
        filtered: state.makes.filter((make) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return make.label.match(regex);
        }),
        loading: false,
      };
    case FILTER_MODEL:
      return {
        ...state,
        filtered: state.models.filter((model) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return model.label.match(regex);
        }),
        loading: false,
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        filtered: state.categories.filter((category) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return category.label.match(regex);
        }),
        loading: false,
      };
    case FILTER_SUB_CATEGORY:
      return {
        ...state,
        filtered: state.subcategories.filter((sub_category) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return sub_category.label.match(regex);
        }),
        loading: false,
      };
    case UPLOAD_FILE: {
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    }
    case CLEAR_FILE:
      return {
        ...state,
        file: null,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
