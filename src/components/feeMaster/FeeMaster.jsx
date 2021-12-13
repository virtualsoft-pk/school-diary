import React, { Fragment, useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash, Eye } from 'react-feather';
import EditFeeMasterModal from './EditFeeMasterModal';
import FeeMasterFilter from './FeeMasterFilter';
import Breadcrumb from '../../layout/breadcrumb';
import AddFeeMaster from './AddFeeMaster';

import {
  getFeeMaster,
  clearError,
  clearMessage,
} from '../../actions/feeMasterAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';

const FeeMaster = ({
  Auth: { user },
  FeeMaster: {
    feeMasterLoading,
    feeMasters,
    feeMasterFiltered,
    error,
    message,
  },
  clearError,
  clearMessage,
  getFeeMaster,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  const [addFeeMaster, setAddFeeMaster] = useState(false);

  useEffect(() => {
    if (user) {
      getFeeMaster(user.school_id);
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
      name: 'Class',
      selector: 'class',
      sortable: true,
      center: true,
    },
    {
      name: 'Fee Group',
      selector: 'feelabel_id',
      sortable: true,
      center: true,
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      center: true,
    },
    {
      name: 'Fee Type',
      selector: 'feetype',
      sortable: true,
      center: true,
    },

    {
      name: 'Action',
      center: true,
      //   width: '250px',
      cell: (row) => (
        <div>
          <button
            className='btn update-button'
            onClick={() => updateToggle(row)}
          >
            <Edit3 />
          </button>

          <button className='btn delete-button' onClick={() => onDelete(row)}>
            <Trash />
          </button>
        </div>
      ),
    },
  ];

  const onAddFeeMaster = () => {
    if (!addFeeMaster) {
      setAddFeeMaster(true);
    } else {
      setAddFeeMaster(false);
    }
  };

  const onDelete = (id) => {};

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Fee Group' />
      <Container fluid={true}>
        {updateModal && (
          <EditFeeMasterModal
            modal={updateModal}
            toggle={updateToggle}
            data={data}
          />
        )}

        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader
                className='p-3'
                style={{
                  fontWeight: 400,
                  fontSize: '22px',
                  // , alignContent: 'center', textAlign: 'center'
                }}
              >
                Fees Master: 2021-22
              </CardHeader>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      className='btn btn-sm'
                      onClick={() => onAddFeeMaster()}
                    >
                      <span>Add Fee Master</span>
                    </Button>
                  </Col>
                  {addFeeMaster && (
                    <>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>

                      <Col sm={12} md={12} style={{ marginTop: '10px' }}>
                        <AddFeeMaster />
                      </Col>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>
                    </>
                  )}

                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Col sm={12} md={11}>
                      <FeeMasterFilter />
                    </Col>
                  </Col>
                  <Col sm={12} md={12}>
                    {feeMasters !== null ? (
                      <TransitionGroup>
                        {feeMasterFiltered === null ? (
                          <DataTable
                            data={feeMasters}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeMasterLoading}
                            progressComponent={<TableLoader />}
                            noHeader={true}
                            pagination={true}
                          />
                        ) : (
                          <DataTable
                            data={feeMasterFiltered}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeMasterLoading}
                            progressComponent={<TableLoader />}
                            noHeader={true}
                            pagination={true}
                          />
                        )}
                      </TransitionGroup>
                    ) : (
                      <TableLoader />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
FeeMaster.propTypes = {
  Auth: PropTypes.object.isRequired,
  FeeMaster: PropTypes.object.isRequired,
  getFeeMaster: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeMaster: state.FeeMaster,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getFeeMaster,
  clearError,
  clearMessage,
})(FeeMaster);
