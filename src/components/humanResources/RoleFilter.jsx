import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { filterRole, clearFilter } from '../../actions/roleAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RoleFilter = ({
  Role: { roles, roleFiltered },
  filterRole,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (roleFiltered === null) {
      clearFilter();
    } //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterRole(e.target.value);
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
            placeholder='Filter Role...'
            onChange={onChange}
            disabled={roles !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

RoleFilter.propTypes = {
  Role: PropTypes.object.isRequired,
  filterRole: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Role: state.Role,
});
export default connect(mapStateToProps, { filterRole, clearFilter })(
  RoleFilter
);
