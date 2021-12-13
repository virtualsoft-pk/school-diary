import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import { filterFeeMaster, clearFilter } from '../../actions/feeMasterAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FeeMasterFilter = ({
  FeeMaster: { feeMasters, feeMasterFiltered },
  filterFeeMaster,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (feeMasterFiltered === null) {
      clearFilter();
    }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterFeeMaster(e.target.value);
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
            placeholder='Filter...'
            onChange={onChange}
            disabled={feeMasters !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

FeeMasterFilter.propTypes = {
  FeeMaster: PropTypes.object.isRequired,
  filterFeeMaster: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeMaster: state.FeeMaster,
});

export default connect(mapStateToProps, { filterFeeMaster, clearFilter })(
  FeeMasterFilter
);
