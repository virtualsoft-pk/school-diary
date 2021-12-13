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
import { updateSubAdmin } from '../../actions/usersManagementActions';

const UpdatePassword = ({
  updateSubAdmin,
  modal,
  toggle,
  id,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (password === '') {
      isValid = false;
      errors['password'] = 'Please enter password.';
    }
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
        id: id,
        new_password: password,
      };
      updateSubAdmin(data);

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
      <Modal isOpen={modal} toggle={toggle} size='sm'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Update Password
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  className='form-control'
                  type={togglePassword ? 'text' : 'password'}
                  name='password'
                  value={password ? password : ''}
                  placeholder=''
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength= "20"
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

            <Col sm={12} md={12}>
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
                  maxLength= "20"
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

UpdatePassword.propTypes = {
  updateSubAdmin: PropTypes.func.isRequired,
};

export default connect(null, { updateSubAdmin })(UpdatePassword);
