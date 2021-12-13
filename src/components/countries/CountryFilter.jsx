import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import {
  filterCountries,
  clearCountriesFilter,
} from '../../actions/dashboardAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CountryFilter = ({
  Dashboard: { countriesData, countryFiltered },
  filterCountries,
  clearCountriesFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    clearCountriesFilter();
    if (countryFiltered === null) {
      text.current.value = '';
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterCountries(e.target.value);
    } else {
      clearCountriesFilter();
    }
  };

  return (
    <div className='card card-mb-faq xs-mt-search'>
      <div className='faq-form'>
        <form>
          <input
            className='form-control no-border'
            ref={text}
            type='text'
            placeholder='Filter Country....'
            onChange={onChange}
            disabled={countriesData !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

CountryFilter.propTypes = {
  Dashboard: PropTypes.object.isRequired,
  filterCountries: PropTypes.func.isRequired,
  clearCountriesFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, {
  filterCountries,
  clearCountriesFilter,
})(CountryFilter);
