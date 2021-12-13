import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { ConfirmPassword, OldPass, NewPass } from '../../constant';
import {
  onChangePassword,
  clearMessage,
  clearError,
} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import TableLoader from '../layout/loader/TableLoader';

const ChangePassword = ({
  Auth: { error, message, userId },
  onChangePassword,
  clearMessage,
  clearError,
}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  const [toggleOldPassword, setToggleOldPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);
  const [toggleCNewPassword, setToggleCNewPassword] = useState(false);

  const [userError, setUserError] = useState('');

  useEffect(() => {
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
  }, [error, message]);

  const validatePassword = () => {
    let errors = {};
    let isValid = true;

    if (oldPass === '') {
      isValid = false;
      errors['oldpassword'] = 'Please enter password.';
    }

    if (oldPass !== '') {
      if (oldPass.length < 8 || oldPass.length > 16) {
        isValid = false;
        errors['oldpassword'] =
          'Old password must contain at between 8-16 characters.';
      }
    }

    if (newPass === '') {
      isValid = false;
      errors['newpassword'] = 'Please enter password.';
    }

    if (newPass !== '') {
      if (newPass.length < 8 || newPass.length > 16) {
        isValid = false;
        errors['newpassword'] =
          'New password must contain at between 8-16 characters.';
      }
    }

    if (confirmNewPass === '') {
      isValid = false;
      errors['confirmPassword'] = 'Please enter cofirm password.';
    }

    if (newPass !== '' && confirmNewPass !== '') {
      if (confirmNewPass !== newPass) {
        isValid = false;
        errors['confirmPassword'] = 'Confirm password not match with password.';
      }
    }
    setUserError(errors);

    return isValid;
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      const data = {
        id: userId,
        user_check: 'super',
        current_password: oldPass,
        new_password: newPass,
      };

      onChangePassword(data);

      setOldPass('');
      setNewPass('');
      setConfirmNewPass('');
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Change Password' />
      <Container fluid={true}>
        <div className='edit-profile'>
          <Row>
            <Col xl='12'>
              <Card>
                <CardBody>
                  {userId !== null ? (
                    <Form>
                      <Row>
                        <Col sm='6' md='4'>
                          <FormGroup>
                            <Label className='form-label'>{OldPass}</Label>
                            <Input
                              className='form-control'
                              type={toggleOldPassword ? 'text' : 'password'}
                              name='password'
                              value={oldPass}
                              onChange={(e) => setOldPass(e.target.value)}
                              placeholder='Old password'
                              maxLength='20'
                            />
                            <div
                              className='show-hide'
                              style={{ top: '47px', right: '24px' }}
                              onClick={() =>
                                setToggleOldPassword(!toggleOldPassword)
                              }
                            >
                              <span
                                className={toggleOldPassword ? '' : 'show'}
                              ></span>
                            </div>
                            <div className='text-danger'>
                              {userError.oldpassword}
                            </div>
                          </FormGroup>
                        </Col>

                        <Col sm='6' md='4'>
                          <FormGroup>
                            <Label className='form-label'>{NewPass}</Label>
                            <Input
                              className='form-control'
                              type={toggleNewPassword ? 'text' : 'password'}
                              name='password'
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              placeholder='New password'
                              maxLength='20'
                            />
                            <div
                              className='show-hide'
                              style={{ top: '47px', right: '24px' }}
                              onClick={() =>
                                setToggleNewPassword(!toggleNewPassword)
                              }
                            >
                              <span
                                className={toggleNewPassword ? '' : 'show'}
                              ></span>
                            </div>
                            <div className='text-danger'>
                              {userError.newpassword}
                            </div>
                          </FormGroup>
                        </Col>

                        <Col sm='6' md='4'>
                          <FormGroup>
                            <Label className='form-label'>
                              {ConfirmPassword}
                            </Label>
                            <Input
                              className='form-control'
                              type={toggleCNewPassword ? 'text' : 'password'}
                              name='password'
                              value={confirmNewPass}
                              onChange={(e) =>
                                setConfirmNewPass(e.target.value)
                              }
                              placeholder='Confirm password'
                              maxLength='20'
                            />
                            <div
                              className='show-hide'
                              style={{ top: '47px', right: '24px' }}
                              onClick={() =>
                                setToggleCNewPassword(!toggleCNewPassword)
                              }
                            >
                              <span
                                className={toggleCNewPassword ? '' : 'show'}
                              ></span>
                            </div>
                            <div className='text-danger'>
                              {userError.confirmPassword}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col sm='12' md='12'>
                          <Button
                            className='btn btn-sm float-right'
                            color='primary'
                            onClick={changePassword}
                          >
                            Change Password
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    <TableLoader />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

ChangePassword.propTypes = {
  Auth: PropTypes.object.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  onChangePassword,
  clearMessage,
  clearError,
})(ChangePassword);
