import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { filterCities, clearCityFilter } from '../../actions/dashboardAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CitiesFilter = ({
  Dashboard: { citiesData, cityFiltered },
  filterCities,
  clearCityFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    clearCityFilter();
    if (cityFiltered === null) {
      text.current.value = '';
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterCities(e.target.value);
    } else {
      clearCityFilter();
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
            placeholder='Filter City....'
            onChange={onChange}
            disabled={citiesData !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

CitiesFilter.propTypes = {
  Dashboard: PropTypes.object.isRequired,
  filterCities: PropTypes.func.isRequired,
  clearCityFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, { filterCities, clearCityFilter })(
  CitiesFilter
);
