import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash } from 'react-feather';
import EditFeeGroupModal from './EditFeeGroupModal';
import FeeGroupFilter from './FeeGroupFilter';
import Breadcrumb from '../../layout/breadcrumb';
import AddFeeGroup from './AddFeeGroup';
import {
  getFeeGroup,
  clearError,
  clearMessage,
} from '../../actions/feeGroupAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';

const FeeGroup = ({
  Auth: { user },
  FeeGroup: { feeGroupLoading, feeGroups, feeGroupFiltered, error, message },
  clearError,
  clearMessage,
  getFeeGroup,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  const [addFeeGroup, setAddFeeGroup] = useState(false);

  useEffect(() => {
    if (user) {
      getFeeGroup(user.school_id);
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

  // created_on: "2021-11-24 17:18:08"

  const tableColumns = [
    {
      name: 'Name',
      selector: 'label',
      sortable: true,
      center: true,
    },
    {
      name: 'Description',
      selector: 'description',
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

  const onAddFeeGroup = () => {
    if (!addFeeGroup) {
      setAddFeeGroup(true);
    } else {
      setAddFeeGroup(false);
    }
  };

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Fee Group' />
      <Container fluid={true}>
        {updateModal && (
          <EditFeeGroupModal
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
                      onClick={() => onAddFeeGroup()}
                    >
                      <span>Add Fee Group</span>
                    </Button>
                  </Col>
                  {addFeeGroup && (
                    <>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>

                      <Col sm={12} md={12} style={{ marginTop: '10px' }}>
                        <AddFeeGroup />
                      </Col>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}></Col>
                    </>
                  )}

                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <FeeGroupFilter />
                  </Col>
                  <Col sm={12} md={12}>
                    {feeGroups !== null ? (
                      <TransitionGroup>
                        {feeGroupFiltered === null ? (
                          <DataTable
                            data={feeGroups}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeGroupLoading}
                            progressComponent={<TableLoader />}
                            noHeader={true}
                            pagination={true}
                          />
                        ) : (
                          <DataTable
                            data={feeGroupFiltered}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            progressPending={feeGroupLoading}
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
FeeGroup.propTypes = {
  Auth: PropTypes.object.isRequired,
  FeeGroup: PropTypes.object.isRequired,
  getFeeGroup: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FeeGroup: state.FeeGroup,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getFeeGroup,
  clearError,
  clearMessage,
})(FeeGroup);
