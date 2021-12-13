import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import blogSingle from '../../assets/images/blog/blog-single.jpg';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import {
  loadHistory,
  viewSchool,
  clearError,
} from '../../actions/schoolAction';
import TableLoader from '../layout/loader/TableLoader';

const ViewSchool = ({
  School: { schoolDetail, subscriptionHistory, schoolLoading, error },
  loadHistory,
  viewSchool,
  clearError,
}) => {
  const history = useHistory();
  const [schoolId, setSchoolId] = useState(history.location.state?.id);

  useEffect(() => {
    if (!schoolId || schoolId === null || schoolId === undefined) {
      RenewRedirect('/virtualsoft/admin/school/school-listing');
    } else {
      viewSchool(schoolId);
      loadHistory(schoolId);
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);

  const RenewRedirect = (redirect) => {
    history.push(redirect);
  };

  const tableColumns = [
    {
      name: 'ID',
      selector: 'package_id',
      sortable: true,
      center: true,
    },
    {
      name: 'Date',
      selector: 'created_on',
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
      name: 'Initial Invoice',
      selector: 'initial_amount',
      sortable: true,
      center: true,
    },
    {
      name: 'Paid Amount',
      selector: 'amount_paid',
      sortable: true,
      center: true,
    },
    {
      name: 'Due Amount',
      selector: 'due_amount',
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
      name: 'Active',
      center: true,
      cell: (row) => (
        <p
          className={
            row.is_active === '0' ? 'f-12 font-danger' : 'f-12 font-success'
          }
        >
          {row.is_active === '0' ? 'in-active' : 'active'}
        </p>
      ),
    },
    {
      name: 'Status',
      center: true,
      //right now status is not reciving from api
      cell: (row) => (
        <p
          className={
            row.is_active === '0' ? 'f-12 font-danger' : 'f-12 font-success'
          }
        >
          {row.is_active === '0' ? 'un-paid' : 'paid'}
        </p>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumb
        parent='Schools'
        parentLink='/virtualsoft/admin/school/school-listing'
        title='Details'
      />
      <Container fluid={true}>
        {schoolDetail !== null && !schoolLoading ? (
          <>
            <div className='user-profile'>
              <Row>
                <Col sm='12'>
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col sm='8'>
                          <div className='media'>
                            <div className='media-body align-self-center'>
                              <h5 className='mt-0 user-name'>School Details</h5>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardHeader>
                    <div className='profile-img-style'>
                      <Row>
                        <div className='banner-image'>
                          <img
                            src={
                              schoolDetail !== null
                                ? schoolDetail.logo
                                : blogSingle
                            }
                            alt='school-logo'
                          />
                        </div>
                      </Row>
                      <Row>
                        <Col lg='12' xl='12'>
                          <ListGroup className='list-group-flush'>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>School Name:</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.name
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>School Email :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.email
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>School Phone # :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.phone
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Principal :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.principal_name
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Principal Email :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.principal_email
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Principal Phone # :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.principal_phone
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>No. of Students :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.no_of_stds
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Country :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.country
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>State :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.state
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>City :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.city
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>address :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.address
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Latitude :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.latitude
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Longitude :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.longitude
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Postal Code :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.postal_code
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Packages :</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.package_label
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                              <Row className='justify-content-around'>
                                <Col sm={5}>
                                  <h6>Packages Duration:</h6>
                                </Col>
                                <Col sm={5}>
                                  {schoolDetail !== null
                                    ? schoolDetail.duration
                                    : ''}
                                </Col>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>

            <div>
              <Card>
                <CardHeader className='p-3'>
                  <h4>History</h4>
                </CardHeader>
                <CardBody>
                  {subscriptionHistory !== null && (
                    <TransitionGroup>
                      <DataTable
                        data={subscriptionHistory}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={schoolLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    </TransitionGroup>
                  )}
                </CardBody>
              </Card>
            </div>
          </>
        ) : (
          <TableLoader />
        )}
      </Container>
    </Fragment>
  );
};

ViewSchool.propTypes = {
  School: PropTypes.object.isRequired,
  loadHistory: PropTypes.func.isRequired,
  viewSchool: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
});

export default connect(mapStateToProps, {
  viewSchool,
  loadHistory,
  clearError,
})(ViewSchool);
