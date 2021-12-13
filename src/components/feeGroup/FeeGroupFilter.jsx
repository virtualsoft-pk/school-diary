import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import { filterFeeGroup, clearFilter } from '../../actions/feeGroupAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FeeGroupFilter = ({
  FeeGroup: { feeGroups, feeGroupFiltered },
  filterFeeGroup,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (feeGroupFiltered === null) {
      clearFilter();
    } //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterFeeGroup(e.target.value);
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
            placeholder='Filter Group...'
            onChange={onChange}
            disabled={feeGroups !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

FeeGroupFilter.propTypes = {
  FeeGroup: PropTypes.object.isRequired,
  filterFeeGroup: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeGroup: state.FeeGroup,
});

export default connect(mapStateToProps, { filterFeeGroup, clearFilter })(
  FeeGroupFilter
);
