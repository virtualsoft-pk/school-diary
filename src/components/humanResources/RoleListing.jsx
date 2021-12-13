import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete, LogOut } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import RoleFilter from './RoleFilter';
import AddRole from './AddRole';
import Breadcrumb from '../../layout/breadcrumb';
import { getRole, clearError, clearMessage } from '../../actions/roleAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TableLoader from '../layout/loader/TableLoader';
import UpdateRole from './UpdateRole';
import { toast } from 'react-toastify';

const RoleListing = ({
  Auth: { user },
  Role: { roles, roleLoading, roleFiltered, message, error },
  getRole,
  clearError,
  clearMessage,
}) => {
  useEffect(() => {
    if (user) {
      getRole(user.school_id);
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }

    // eslint-disable-next-line
  }, [message, error, user]);

  const tableColumns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      center: true,
    },

    {
      name: 'Role',
      selector: 'label',
      sortable: true,
      center: true,
    },

    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div>
          <button
            className='btn update-button'
            onClick={() => updateToggle(row)}
          >
            <Edit3 />
          </button>
          {/* <button className='btn delete-button' onClick={() => onDelete(row)}>
            <Delete />
          </button> */}
        </div>
      ),
    },
  ];

  //   const onDelete = (data) => {
  //     // deleteCategory(data.id);
  //   };

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const [addModal, setAddModal] = useState(false);
  const addToggle = () => setAddModal(!addModal);

  return (
    <Fragment>
      {updateModal && (
        <UpdateRole modal={updateModal} toggle={updateToggle} data={data} />
      )}
      {addModal && <AddRole modal={addModal} toggle={addToggle} />}
      <Breadcrumb parent={null} title='Role' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      onClick={addToggle}
                      className='btn btn-sm'
                    >
                      Add Role
                    </Button>
                  </Col>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <RoleFilter />
                  </Col>
                </Row>
                {roles !== null ? (
                  <TransitionGroup>
                    {roleFiltered === null ? (
                      <DataTable
                        data={roles}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={roleLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    ) : (
                      <DataTable
                        data={roleFiltered}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={roleLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    )}
                  </TransitionGroup>
                ) : (
                  <TableLoader />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

RoleListing.propTypes = {
  Role: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getRole: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Role: state.Role,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getRole,
  clearError,
  clearMessage,
})(RoleListing);
