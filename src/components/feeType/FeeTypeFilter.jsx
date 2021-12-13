import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import { filterFeeType, clearFilter } from '../../actions/feeTypeAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FeeTypeFilter = ({
  FeeType: { feeTypes, feeTypeFiltered },
  filterFeeType,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (feeTypeFiltered === null) {
      clearFilter();
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterFeeType(e.target.value);
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
            placeholder='Filter Type...'
            onChange={onChange}
            disabled={feeTypes !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

FeeTypeFilter.propTypes = {
  FeeType: PropTypes.object.isRequired,
  filterFeeType: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeType: state.FeeType,
});

export default connect(mapStateToProps, { filterFeeType, clearFilter })(
  FeeTypeFilter
);
