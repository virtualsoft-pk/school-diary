import React, { Fragment, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash, Eye } from 'react-feather';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ViewSchoolModal from './ViewSchool';
import moment from 'moment';
import UpdateSchool from './UpdateSchool';

import {
  loadSchools,
  clearError,
  clearMessage,
} from '../../actions/schoolAction';
// import EditBlogModal from './EditBlogModal';
import TableLoader from '../layout/loader/TableLoader';

const Schools = ({
  School: { schoolLoading, error, message, schools, schoolFiltered },
  loadSchools,
  clearError,
  clearMessage,
}) => {
  const history = useHistory();
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  const [schoolId, setSchoolId] = useState(null);

  const ViewSchoolRedirect = (redirect) => {
    history.push({
      pathname: redirect,
      state: {
        id: schoolId,
      },
    });
  };

  useEffect(() => {
    loadSchools();

    if (schoolId !== null) {
      ViewSchoolRedirect(`/virtualsoft/admin/school/school-listing/detail`);
    }

    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    //eslint-disable-next-line
  }, [schoolId, error, message]);

  const tableColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'School Name',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      center: true,
    },
    {
      name: 'Packages',
      selector: 'package_label',
      sortable: true,
      center: true,
    },
    {
      name: 'Students',
      selector: 'no_of_stds',

      sortable: true,
      center: true,
    },

    {
      name: 'Details',
      center: true,
      width: '200px',
      cell: (row) => (
        <div>
          <button className='btn view-button' onClick={() => viewToggle(row)}>
            <Eye />
          </button>
          <button
            className='btn update-button'
            onClick={() => updateToggle(row)}
          >
            <Edit3 />
          </button>
        </div>
      ),
    },
  ];

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const viewToggle = (data) => {
    setSchoolId(data.id);
  };

  return (
    <Fragment>
      {updateModal && (
        <UpdateSchool modal={updateModal} toggle={updateToggle} data={data} />
      )}

      {schools !== null ? (
        <TransitionGroup>
          {schoolFiltered === null ? (
            <DataTable
              data={schools}
              columns={tableColumns}
              striped={true}
              center={true}
              progressPending={schoolLoading}
              progressComponent={<TableLoader />}
              noHeader={true}
              pagination={true}
            />
          ) : (
            <DataTable
              data={schoolFiltered}
              columns={tableColumns}
              striped={true}
              center={true}
              progressPending={schoolLoading}
              progressComponent={<TableLoader />}
              noHeader={true}
              pagination={true}
            />
          )}
        </TransitionGroup>
      ) : (
        <TableLoader />
      )}
    </Fragment>
  );
};

Schools.propTypes = {
  School: PropTypes.object.isRequired,
  loadSchools: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
});

export default connect(mapStateToProps, {
  loadSchools,
  clearError,
  clearMessage,
})(Schools);
