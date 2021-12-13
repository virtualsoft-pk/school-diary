import React, { useRef, useEffect } from 'react';
import { filterUsers, clearFilter } from '../../actions/usersManagementActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';

const UserFilter = ({
  UserManagement: { subAdminFiltered },
  filterUsers,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    clearFilter();
    if (subAdminFiltered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterUsers(e.target.value);
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
            placeholder='Filter User...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

UserFilter.propTypes = {
  UserManagement: PropTypes.object.isRequired,
  filterUsers: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UserManagement: state.UserManagement,
});

export default connect(mapStateToProps, { filterUsers, clearFilter })(
  UserFilter
);
