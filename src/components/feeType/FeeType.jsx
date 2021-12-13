import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3 } from 'react-feather';
import EditFeeTypeModal from './EditFeeTypeModal';
import FeeTypeFilter from './FeeTypeFilter';
import Breadcrumb from '../../layout/breadcrumb';
import AddFeeType from './AddFeeType';
import {
  getFeeType,
  clearError,
  clearMessage,
} from '../../actions/feeTypeAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';

const FeeType = ({
  Auth: { user },
  FeeType: { feeTypeLoading, feeTypes, feeTypeFiltered, error, message },
  clearError,
  clearMessage,
  getFeeType,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  const [addFeeType, setAddFeeType] = useState(false);

  useEffect(() => {
    if (user) {
      getFeeType(user.school_id);
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
      name: 'Name',
      selector: 'label',
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
        </div>
      ),
    },
  ];

  const onAddFeeType = () => {
    if (!addFeeType) {
      setAddFeeType(true);
    } else {
      setAddFeeType(false);
    }
  };

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Fee Type' />
      <Container fluid={true}>
        {updateModal && (
          <EditFeeTypeModal
            modal={updateModal}
            toggle={updateToggle}
            data={data}
          />
        )}

        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      className='btn btn-sm'
                      onClick={() => onAddFeeType()}
                    >
                      <span>Add Fee Type</span>
                    </Button>
                  </Col>
                  {addFeeType && (
                    <>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>

                      <Col sm={12} md={12} style={{ marginTop: '10px' }}>
                        <AddFeeType />
                      </Col>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>
                    </>
                  )}

                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <FeeTypeFilter />
                  </Col>
                  <Col sm={12} md={12}>
                    {feeTypes !== null ? (
                      <TransitionGroup>
                        {feeTypeFiltered === null ? (
                          <DataTable
                            data={feeTypes}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeTypeLoading}
                            progressComponent={<TableLoader />}
                            noHeader={true}
                            pagination={true}
                          />
                        ) : (
                          <DataTable
                            data={feeTypeFiltered}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeTypeLoading}
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
FeeType.propTypes = {
  Auth: PropTypes.object.isRequired,
  FeeType: PropTypes.object.isRequired,
  getFeeType: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeType: state.FeeType,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getFeeType,
  clearError,
  clearMessage,
})(FeeType);
