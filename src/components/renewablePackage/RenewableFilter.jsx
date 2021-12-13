import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import {
  filterRenewableRequest,
  clearFilter,
} from '../../actions/renewableRequestAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RenewableFilter = ({ filterRenewableRequest, clearFilter }) => {
  const text = useRef('');

  useEffect(() => {
    clearFilter();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterRenewableRequest(e.target.value);
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
            placeholder='Filter Country...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

RenewableFilter.propTypes = {
  filterRenewableRequest: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export default connect(null, { filterRenewableRequest, clearFilter })(
  RenewableFilter
);
