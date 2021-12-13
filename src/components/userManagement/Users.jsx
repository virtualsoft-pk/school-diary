import React, { useState, Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loadAdminData,
  loadSubAdmin,
  clearError,
  clearMessage,
} from '../../actions/usersManagementActions';
import AddUserManagement from './AddUserManagement';
import AssignRoles from './AssignRoles';
import Breadcrumb from '../../layout/breadcrumb';
import UserFilter from './UserFilter';
import { CheckCircle, X } from 'react-feather';

const Users = ({
  UserManagement: {
    subAdmins,
    subAdminFiltered,
    selectedSubAdmin,
    subAdminLoading,
    message,
    error,
  },
  loadAdminData,
  loadSubAdmin,
  clearError,
  clearMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);

  useEffect(() => {
    loadSubAdmin();
    if (userData !== null) {
      loadAdminData(userData.id);
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
  }, [message, error, subAdminFiltered]);

  const adduserToggle = () => setAddUserModal(!addUserModal);

  const getUserData = (user) => {
    setUserData(user);
    loadAdminData(user.id);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='User Management' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={7} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      className='btn btn-sm'
                      onClick={adduserToggle}
                    >
                      <span>Add User</span>
                    </Button>
                  </Col>
                  <Col sm={12} md={5} style={{ marginTop: '10px' }}>
                    <UserFilter />
                  </Col>
                </Row>
                <AddUserManagement
                  modal={addUserModal}
                  toggle={adduserToggle}
                />

                <Row style={{ height: '100%' }}>
                  {subAdmins && subAdmins !== null ? (
                    <Fragment>
                      {subAdmins.length > 0 ? (
                        <Fragment>
                          <Col sm={12} md={4}>
                            <h6 style={{ padding: '0px 15px' }}>Users</h6>
                            <hr />
                            <div className='settings'>
                              <ul>
                                {subAdminFiltered !== null ? (
                                  <Fragment>
                                    {subAdminFiltered.length > 0 ? (
                                      <Fragment>
                                        {subAdminFiltered.map((user, i) => (
                                          <Fragment key={i}>
                                            <div
                                              className={`${
                                                userData !== null
                                                  ? user.id === userData.id
                                                    ? 'active'
                                                    : 'not-active'
                                                  : 'not-active'
                                              }`}
                                            >
                                              <li
                                                key={i}
                                                onClick={() =>
                                                  getUserData(user)
                                                }
                                              >
                                                {user.is_blocked === '1' ? (
                                                  <X />
                                                ) : (
                                                  <CheckCircle />
                                                )}
                                                <span>{user.name} </span>
                                              </li>
                                            </div>
                                          </Fragment>
                                        ))}
                                      </Fragment>
                                    ) : (
                                      <p className='no-data-found'>
                                        No user found.
                                      </p>
                                    )}
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    {subAdmins.map((user, i) => (
                                      <Fragment key={i}>
                                        <div
                                          className={`${
                                            userData !== null
                                              ? user.id === userData.id
                                                ? 'active'
                                                : 'not-active'
                                              : 'not-active'
                                          }`}
                                        >
                                          <li
                                            key={i}
                                            onClick={() => getUserData(user)}
                                          >
                                            {user.is_blocked === '1' ? (
                                              <X />
                                            ) : (
                                              <CheckCircle />
                                            )}
                                            <span>{user.name} </span>
                                          </li>
                                        </div>
                                      </Fragment>
                                    ))}
                                  </Fragment>
                                )}
                              </ul>
                            </div>
                            <hr />
                          </Col>

                          <Col sm={12} md={8} className='assign-roles'>
                            {userData !== null ? (
                              <Fragment>
                                {selectedSubAdmin !== null &&
                                !subAdminLoading ? (
                                  <AssignRoles id={userData.id} />
                                ) : (
                                  <Col md='12'>
                                    <div className='loader-box'>
                                      <div className='loader-30'></div>
                                    </div>
                                  </Col>
                                )}
                              </Fragment>
                            ) : (
                              <p className='no-data-found'>
                                Please select a user first.
                              </p>
                            )}
                          </Col>
                        </Fragment>
                      ) : (
                        <p className='no-data-found'>Please add user first.</p>
                      )}
                    </Fragment>
                  ) : (
                    <Col md='12'>
                      <div className='loader-box'>
                        <div className='loader-30'></div>
                      </div>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Users.propTypes = {
  UserManagement: PropTypes.object.isRequired,
  loadSubAdmin: PropTypes.func.isRequired,
  loadAdminData: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UserManagement: state.UserManagement,
});

export default connect(mapStateToProps, {
  loadAdminData,
  loadSubAdmin,
  clearError,
  clearMessage,
})(Users);
