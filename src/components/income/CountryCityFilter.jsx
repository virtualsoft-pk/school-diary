import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { filterPackages, clearFilter } from '../../actions/incomeAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CountryCityFilter = ({ filterPackages, clearFilter }) => {
  const text = useRef('');

  useEffect(() => {
    clearFilter();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPackages(e.target.value);
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
            placeholder='Filter Country/City...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

CountryCityFilter.propTypes = {
  filterPackages: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export default connect(null, { filterPackages, clearFilter })(
  CountryCityFilter
);
