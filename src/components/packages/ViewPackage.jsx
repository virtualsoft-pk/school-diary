import React, { Fragment, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  CardHeader,
} from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { packageDetails, clearError } from '../../actions/packageAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';

const ViewPackage = ({
  Package: { packageDetail, packageLoading, error },
  packageDetails,
  clearError,
}) => {
  const history = useHistory();
  const [packageId, setPackageId] = useState(history.location.state?.id);

  useEffect(() => {
    if (!packageId || packageId === null || packageId === undefined) {
      RenewRedirect('/virtualsoft/admin/packages');
    } else {
      packageDetails(packageId);
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

  return (
    <Fragment>
      <Breadcrumb
        parent='Packages'
        parentLink='/virtualsoft/admin/packages'
        title='Details'
      />
      <Container fluid={true}>
        <div className='user-profile'>
          {packageDetail !== null && !packageLoading ? (
            <Row>
              <Col sm='12'>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col sm='8'>
                        <div className='media'>
                          <div className='media-body align-self-center'>
                            <h5 className='mt-0 user-name'>Package Details</h5>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>

                  <div
                    className='profile-img-style'
                    style={{ paddingTop: '0px' }}
                  >
                    <Row>
                      <Col lg='12' xl='12'>
                        <ListGroup className='list-group-flush'>
                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Id:</h6>
                              </Col>
                              <Col sm={5}>{packageDetail.id}</Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Package Name:</h6>
                              </Col>
                              <Col sm={5}>{packageDetail.label}</Col>
                            </Row>
                          </ListGroupItem>

                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Price:</h6>
                              </Col>
                              <Col sm={5}>{packageDetail.price}</Col>
                            </Row>
                          </ListGroupItem>

                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Duration:</h6>
                              </Col>
                              <Col sm={5}>{packageDetail.duration}</Col>
                            </Row>
                          </ListGroupItem>

                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Number Of Student:</h6>
                              </Col>
                              <Col sm={5}>{packageDetail.no_of_stds}</Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row className='justify-content-around'>
                              <Col sm={5}>
                                <h6>Created On:</h6>
                              </Col>

                              <Col sm={5}>
                                {moment(packageDetail.created_on).format(
                                  'YYYY-MM-DD'
                                )}
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
          ) : (
            <TableLoader />
          )}
        </div>
      </Container>
    </Fragment>
  );
};
ViewPackage.propTypes = {
  Package: PropTypes.object.isRequired,
  packageDetails: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Package: state.Package,
});

export default connect(mapStateToProps, {
  packageDetails,
  clearError,
})(ViewPackage);
