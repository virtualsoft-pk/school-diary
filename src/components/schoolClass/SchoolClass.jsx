import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3 } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import ClassFilter from './ClassFilter';
import AddClass from './AddClass';
import Breadcrumb from '../../layout/breadcrumb';
import { getClass, clearError, clearMessage } from '../../actions/classAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';
import UpdateClass from './UpdateClass';

const SchoolClass = ({
  Auth: { user },
  Class: { classes, classLoading, classFiltered, error, message },
  clearError,
  clearMessage,
  getClass,
}) => {
  useEffect(() => {
    if (user) {
      getClass(user.school_id);
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
      name: 'Class Name',
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
        </div>
      ),
    },
  ];

  const [addModal, setAddModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const addToggle = () => setAddModal(!addModal);

  return (
    <Fragment>
      {updateModal && (
        <UpdateClass modal={updateModal} toggle={updateToggle} data={data} />
      )}

      <Breadcrumb parent={null} title='Class' />
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
                      Add Class
                    </Button>
                    <AddClass modal={addModal} toggle={addToggle} />
                  </Col>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <ClassFilter />
                  </Col>
                </Row>
                {classes !== null ? (
                  <TransitionGroup>
                    {classFiltered === null ? (
                      <DataTable
                        data={classes}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={classLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    ) : (
                      <DataTable
                        data={classFiltered}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={classLoading}
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

SchoolClass.propTypes = {
  Auth: PropTypes.object.isRequired,
  Class: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Class: state.Class,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getClass,
  clearError,
  clearMessage,
})(SchoolClass);
