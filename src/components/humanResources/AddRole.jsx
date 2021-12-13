import React, { useEffect, useState } from 'react';
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

import { addRole } from '../../actions/roleAction';

const AddRole = ({
  modal,
  toggle,
  addRole,
  Role: { message },
  Auth: { user, userId },
}) => {
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (message !== null) {
      setRole('');
      toggle();
    }

    // eslint-disable-next-line
  }, [message]);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (role === '') {
      isValid = false;
      errors['role'] = 'Please enter role.';
    }
    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (user) {
        const newRole = {
          label: role,
          school_id: user.school_id,
          created_by: userId,
        };
        addRole(newRole);
        // Clear fields
      }
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
          Add Role
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='role'>Role</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='role'
                  value={role ? role : ''}
                  placeholder='Enter role'
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className='text-danger'>{errors.role}</div>
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
AddRole.propTypes = {
  Role: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  addRole: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Role: state.Role,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  addRole,
})(AddRole);
