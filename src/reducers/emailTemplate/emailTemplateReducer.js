import { 
    GET_EMAIL_TEMPLATES,
    EMAIL_TEMPLATES_ERROR,
    GET_EMAIL_DETAILS,
    EMAIL_DETAILS_ERROR,
    UPDATE_TEMPLATE,
    UPDATE_TEMPLATE_ERROR,
    SET_LOADING,
    CLEAR_ERRORS,
    CLEAR_MESSAGE,
   } from '../../actions/types';
  
  const initialState = {
    templates: null,
    templateDetails: null,
    orderPlace: null,
    confirmOrder: null,
    dispatchOrder: null,
    returnOrder: null,
    cancleOrder: null,
    sendCredentials: null,
    contactUs: null,
    error: null,
    message: null,
    loading: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EMAIL_TEMPLATES:
            return {
            ...state,
            templates: action.payload.data,
            orderPlace: action.payload.orderPlace,
            confirmOrder: action.payload.confirmOrder,
            dispatchOrder: action.payload.dispatchOrder,
            returnOrder: action.payload.returnOrder,
            cancleOrder: action.payload.cancleOrder,
            sendCredentials: action.payload.sendCredentials,
            contactUs: action.payload.contactUs,
            loading: false,
            };
        case GET_EMAIL_DETAILS:
            return {
            ...state,
            templateDetails: action.payload,
            loading: false,
            };
        case UPDATE_TEMPLATE:
            return {
            ...state,
            message: action.payload.message,
            loading: false,
            };
        case EMAIL_TEMPLATES_ERROR:
        case EMAIL_DETAILS_ERROR:
        case UPDATE_TEMPLATE_ERROR:
            return {
            ...state,
            error: action.payload
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
  