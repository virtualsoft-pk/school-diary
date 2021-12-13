import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import SalePersonFilter from './SalePersonFilter';
import AddSalePerson from './AddSalePerson';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateSalePerson from './UpdateSalePerson';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loadSalesPersons,
  clearError,
  clearMessage,
} from '../../actions/salesPersonsAction';
import { toast } from 'react-toastify';
import { TransitionGroup } from 'react-transition-group';
import TableLoader from '../layout/loader/TableLoader';

const SalePersons = ({
  SalesPersons: {
    salesPersons,
    salesPersonsLoading,
    salesPersonsFiltered,
    message,
    error,
  },
  loadSalesPersons,
  clearError,
  clearMessage,
}) => {
  useEffect(() => {
    loadSalesPersons();
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
  }, [message, error]);

  const tableColumns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      center: true,
    },
    {
      name: 'Phone Number',
      selector: 'phone',
      sortable: true,
      center: true,
    },
    {
      name: 'CNIC',
      selector: 'cnic',
      sortable: true,
      center: true,
    },
    {
      name: 'Joining Date',
      selector: 'doj',
      sortable: true,
      center: true,
    },
    {
      name: 'Address',
      selector: 'address',
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
        <UpdateSalePerson
          modal={updateModal}
          toggle={updateToggle}
          data={data}
        />
      )}
      {addModal && <AddSalePerson modal={addModal} toggle={addToggle} />}

      <Breadcrumb parent={null} title='Sales Person' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={7} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      onClick={addToggle}
                      className='btn btn-sm'
                    >
                      Add Sales Person
                    </Button>
                  </Col>
                  <Col sm={12} md={5} style={{ marginTop: '10px' }}>
                    <SalePersonFilter />
                  </Col>
                </Row>

                {salesPersons !== null ? (
                  <TransitionGroup>
                    {salesPersonsFiltered === null ? (
                      <DataTable
                        data={salesPersons}
                        columns={tableColumns}
                        progressPending={salesPersonsLoading}
                        progressComponent={<TableLoader />}
                        striped={true}
                        center={true}
                        noHeader={true}
                        pagination={true}
                      />
                    ) : (
                      <DataTable
                        data={salesPersonsFiltered}
                        columns={tableColumns}
                        progressPending={salesPersonsLoading}
                        progressComponent={<TableLoader />}
                        striped={true}
                        center={true}
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

SalePersons.propTypes = {
  SalesPersons: PropTypes.object.isRequired,
  loadSalesPersons: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  SalesPersons: state.SalesPersons,
});

export default connect(mapStateToProps, {
  loadSalesPersons,
  clearError,
  clearMessage,
})(SalePersons);
