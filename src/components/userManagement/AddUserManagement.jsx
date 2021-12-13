import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSubAdmin } from '../../actions/usersManagementActions';
import { titleCase } from 'title-case';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddUserManagement = ({
  Auth: { userId },
  addSubAdmin,
  modal,
  toggle,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (userName === '') {
      isValid = false;
      errors['userName'] = 'Please enter your name.';
    }

    if (userEmail === '') {
      isValid = false;
      errors['userEmail'] = 'Please enter your email Address.';
    }

    if (userEmail !== '') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(userEmail)) {
        isValid = false;
        errors['userEmail'] = 'Please enter a valid email address.';
      }
    }

    if (phoneNumber === '') {
      isValid = false;
      errors['phoneNumber'] = 'Please enter your phone number.';
    }
    if (phoneNumber !== '') {
      let pattern = new RegExp(/^[0-9]{1,15}$/i);
      if (!pattern.test(phoneNumber)) {
        isValid = false;
        errors['phoneNumber'] = 'Please enter a valid phone number.';
      }
    }

    if (password === '') {
      isValid = false;
      errors['password'] = 'Please enter password.';
    }

    // if (password !== '') {
    //   if (password.length < 8) {
    //     isValid = false;
    //     errors['password'] = 'The password must contain at least 8 characters.';
    //   }
    // }

    if (confirmPassword === '') {
      isValid = false;
      errors['confirmPassword'] = 'Please enter cofirm password.';
    }

    if (password !== '' && confirmPassword !== '') {
      if (confirmPassword !== password) {
        isValid = false;
        errors['confirmPassword'] = 'Confirm password not match with password.';
      }
    }
    setError(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        name: userName,
        email: userEmail,
        phone: phoneNumber,
        password: password,
        created_by: userId,
      };
      addSubAdmin(data);
      setUserName('');
      setUserEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');

      toggle();
    }
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Add User
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='userName'>User Name</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='userName'
                  value={userName ? userName : ''}
                  placeholder='User Name'
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <div className='text-danger'>{error.userName}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='userEmail'>Email</Label>
                <Input
                  className='form-control'
                  type='email'
                  name='userEmail'
                  value={userEmail ? userEmail : ''}
                  placeholder='Email'
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <div className='text-danger'>{error.userEmail}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <PhoneInput
                  enableSearch
                  disableSearchIcon
                  inputStyle={{ width: '100%' }}
                  searchStyle={{ margin: '0', width: '97%', height: '30px' }}
                  country={'ae'}
                  value={phoneNumber ? phoneNumber : ''}
                  onChange={(e) => setPhoneNumber(e)}
                  placeholder='Phone Number'
                />
                <div className='text-danger'>{error.phoneNumber}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input
                  className='form-control'
                  type={togglePassword ? 'text' : 'password'}
                  name='password'
                  value={password ? password : ''}
                  placeholder=''
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength='20'
                />
                <div
                  className='show-hide'
                  style={{ top: '47px', right: '24px' }}
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  <span className={togglePassword ? '' : 'show'}></span>
                </div>
                <div className='text-danger'>{error.password}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  className='form-control'
                  type={toggleConfirmPassword ? 'text' : 'password'}
                  name='Confirm Password'
                  value={confirmPassword ? confirmPassword : ''}
                  placeholder=''
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  maxLength='20'
                />
                <div
                  className='show-hide'
                  style={{ top: '47px', right: '24px' }}
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                >
                  <span className={toggleConfirmPassword ? '' : 'show'}></span>
                </div>
                <div className='text-danger'>{error.confirmPassword}</div>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => onSubmit(e)}
            color='primary'
            className='btn btn-sm'
          >
            Submit
          </Button>
          <Button color='secondary' className='btn btn-sm' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddUserManagement.propTypes = {
  Auth: PropTypes.object.isRequired,
  addSubAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, { addSubAdmin })(AddUserManagement);
