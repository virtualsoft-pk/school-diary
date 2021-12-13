import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import {
  filterSchools,
  clearSchoolFilter,
} from '../../actions/dashboardAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SchoolDashboardFilter = ({
  Dashboard: { schoolData, schoolFiltered },
  filterSchools,
  clearSchoolFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    clearSchoolFilter();
    if (schoolFiltered === null) {
      text.current.value = '';
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterSchools(e.target.value);
    } else {
      clearSchoolFilter();
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
            placeholder='Filter School...'
            onChange={onChange}
            disabled={schoolData !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

SchoolDashboardFilter.propTypes = {
  Dashboard: PropTypes.object.isRequired,
  filterSchools: PropTypes.func.isRequired,
  clearSchoolFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, { filterSchools, clearSchoolFilter })(
  SchoolDashboardFilter
);
