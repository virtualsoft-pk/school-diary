import {
  GET_INCOME,
  INCOME_ERROR,
  FILTER_INCOME,
  CLEAR_INCOME_FILTER,
  SET_INCOME_LOADING,
  CLEAR_INCOME_ERRORS,
  CLEAR_INCOME_MESSAGE,
  INCOME_DETAILS,
  ADD_SUB
} from '../../actions/types';

const initialState = {
  incomeLoading: false,
  errors: null,
  message: null,
  incomes: null,
  totals: null,
  incomeFiltered: null,
  incomeDetails: [],
  totalRevenue: null,
  totalSoldPackages: null,
  totalActivePackages: null,
  packageId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INCOME:
      return {
        ...state,
        incomes: action.payload.cards_data,
        totals: action.payload.total,
        incomeLoading: false,
      };
    case INCOME_DETAILS:
      return {
        ...state, 
        incomeDetails: action.payload.data.per_city_country,
        totalRevenue: action.payload.data.revenue,
        totalSoldPackages: action.payload.data.times_sold,
        totalActivePackages: action.payload.data.active_subscriptions,
        incomeLoading: false,
      };
    case ADD_SUB:
      return {
        ...state,
        message: action.payload.message,
        incomeLoading: false,
      };

    case FILTER_INCOME:
      return {
        ...state,
        incomeFiltered: state.incomeDetails.filter((income) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return income.country.match(regex) || income.city.match(regex);
        }),
      };

    case CLEAR_INCOME_FILTER:
      return {
        ...state,
        incomeFiltered: null,
      };

    case INCOME_ERROR:
      return {
        ...state,
        incomeLoading: false,
        errors: action.payload,
      };

    case CLEAR_INCOME_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case CLEAR_INCOME_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_INCOME_LOADING:
      return {
        ...state,
        incomeLoading: true,
      };
    default:
      return state;
  }
};
