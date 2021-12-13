import {
  GET_DASHBOARD,
  DASHBOARD_ERROR,
  SET_DASHBOARD_LOADING,
  CLEAR_DASHBOARD_SCHOOLS_FILTER,
  FILTER_DASHBOARD_SCHOOLS,
  CLEAR_DASHBOARD_CITY_FILTER,
  FILTER_DASHBOARD_CITIES,
  CLEAR_DASHBOARD_COUNTRIES_FILTER,
  FILTER_DASHBOARD_COUNTRIES,
  GET_CITY_NAME,
  CLEAR_DASHBOARD_ERRORS,
  CLEAR_DASHBOARD_MESSAGE,
} from '../../actions/types';

const initialState = {
  cities: null,
  countries: null,
  schools: null,
  income: null,
  recentPurchase: null,
  schoolData: null,
  schoolFiltered: null,
  citiesData: null,
  cityFiltered: null,
  countriesData: null,
  countryFiltered: null,
  cityName: null,
  graph: null,
  packages: null,
  loading: false,
  error: null,
  message: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        cities: action.payload.cities,
        countries: action.payload.countries,
        schools: action.payload.schools,
        income: action.payload.income,
        recentPurchase: action.payload.recent_purchases,
        graph: action.payload.graph,
        packages: action.payload.packages,
        schoolData: action.payload.schools_expansion,
        countriesData: action.payload.countries_expansion,
        citiesData: action.payload.cities_expansion,
        loading: false,
      };

    case FILTER_DASHBOARD_SCHOOLS:
      return {
        ...state,
        schoolFiltered: state.schoolData.filter((school) => {
          return (
            JSON.stringify(school.name)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
          // const regex = new RegExp(`${action.payload}`, 'gi');
          // return school.name.match(regex);
        }),
      };

    case CLEAR_DASHBOARD_SCHOOLS_FILTER:
      return {
        ...state,
        schoolFiltered: null,
      };

    case FILTER_DASHBOARD_CITIES:
      return {
        ...state,
        cityFiltered: state.citiesData.filter((cities) => {
          return (
            JSON.stringify(cities.city)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case CLEAR_DASHBOARD_CITY_FILTER:
      return {
        ...state,
        cityFiltered: null,
      };

    case FILTER_DASHBOARD_COUNTRIES:
      return {
        ...state,
        countryFiltered: state.countriesData.filter((countries) => {
          return (
            JSON.stringify(countries.country)
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) !== -1
          );
        }),
      };

    case GET_CITY_NAME:
      return {
        ...state,
        cityName: action.payload,
      };
    case CLEAR_DASHBOARD_COUNTRIES_FILTER:
      return {
        ...state,
        countryFiltered: null,
      };

    case DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_DASHBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_DASHBOARD_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_DASHBOARD_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
