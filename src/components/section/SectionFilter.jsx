import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import { filterSection, clearFilter } from '../../actions/sectionAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SectionFilter = ({
  Section: { sections, sectionFiltered },
  filterSection,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (sectionFiltered === null) {
      clearFilter();
    } //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterSection(e.target.value);
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
            placeholder='Filter Section...'
            onChange={onChange}
            disabled={sections !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};
SectionFilter.propTypes = {
  Section: PropTypes.object.isRequired,
  filterSection: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Section: state.Section,
});

export default connect(mapStateToProps, { filterSection, clearFilter })(
  SectionFilter
);
