import { CONTACT_US, CONTACT_US_ERROR, SEND_REPLY, SEND_REPLY_ERROR, CLEAR_ERRORS, CLEAR_MESSAGE , DELETE_CONTACT_US, DELETE_CONTACT_US_ERROR} from '../../actions/types';

const initialState = {
  contact_us: null,
  count: null,
  message: null,
  error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_US:
          return {
            ...state,
            contact_us: action.payload.data,
            count: action.payload.count
          };
        case CONTACT_US_ERROR:
        case SEND_REPLY_ERROR:
        case DELETE_CONTACT_US_ERROR:
          return {
            ...state,
            error: action.payload
          }
        case SEND_REPLY:
        case DELETE_CONTACT_US:
          return {
            ...state,
            message: action.payload.message
          }
        case CLEAR_ERRORS:
          return{
              ...state,
              error: null
          };
        case CLEAR_MESSAGE:
            return{
                ...state,
                message: null
            };
        default:
          return state;
      }
    };
    