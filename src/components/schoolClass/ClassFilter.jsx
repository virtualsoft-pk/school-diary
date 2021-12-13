import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { filterClass, clearFilter } from '../../actions/classAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ClassFilter = ({
  Class: { classes, classFiltered },
  filterClass,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (classFiltered === null) {
      clearFilter();
    } //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterClass(e.target.value);
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
            placeholder='Filter Class...'
            onChange={onChange}
            disabled={classes !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

ClassFilter.propTypes = {
  Class: PropTypes.object.isRequired,
  filterClass: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Class: state.Class,
});

export default connect(mapStateToProps, { filterClass, clearFilter })(
  ClassFilter
);
