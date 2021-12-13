import { 
    SUPPORT_SEND ,
    SUPPORT_LOADING ,
    SUPPORT_ERROR ,
    SUPPORT_CLEAR_ERROR,
    SUPPORT_CLEAR_MESSAGE
} from '../../actions/types';

const initialState = {
    supportLoading: false,
    error: null,
    message: null,
    
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SUPPORT_SEND:
        return {
          ...state,
          message: action.payload.message,
          supportLoading: false,
        };
      case SUPPORT_ERROR:
        return {
          ...state,
          supportLoading: false,
          error: action.payload,
        };
  
      case SUPPORT_CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      case SUPPORT_CLEAR_MESSAGE:
        return {
          ...state,
          message: null,
        };
      case SUPPORT_LOADING:
        return {
          ...state,
          supportLoading: true,
        };
      default:
        return state;
    }
  };
  