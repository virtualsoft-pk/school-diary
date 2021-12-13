import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import {
  filterAssignSection,
  clearFilter,
} from '../../actions/assignSectionAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AssignSectionFilter = ({
  AssignSection: { assignSections, assignSectionFiltered },
  filterAssignSection,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (assignSectionFiltered === null) {
      clearFilter();
    } //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterAssignSection(e.target.value);
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
            disabled={assignSections !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};
AssignSectionFilter.propTypes = {
  AssignSection: PropTypes.object.isRequired,
  filterAssignSection: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  AssignSection: state.AssignSection,
});

export default connect(mapStateToProps, { filterAssignSection, clearFilter })(
  AssignSectionFilter
);
