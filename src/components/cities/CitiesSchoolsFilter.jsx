import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { filterSchools, clearFilter } from '../../actions/citySchoolsAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const CitiesSchoolsFilter = ({
  CitySchool: { schools, schoolFiltered },
  filterSchools,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    clearFilter();
    if (schoolFiltered === null) {
      text.current.value = '';
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterSchools(e.target.value);
    } else {
      clearFilter();
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
            placeholder='Filter School....'
            onChange={onChange}
            disabled={schools !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

CitiesSchoolsFilter.propTypes = {
  CitySchool: PropTypes.object.isRequired,
  filterSchools: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  CitySchool: state.CitySchool,
});

export default connect(mapStateToProps, { filterSchools, clearFilter })(
  CitiesSchoolsFilter
);
