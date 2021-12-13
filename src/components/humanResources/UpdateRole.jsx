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

import { updateRole } from '../../actions/roleAction';

const UpdateRole = ({
  data,
  modal,
  toggle,
  updateRole,
  Role: { message },
  Auth: { userId },
}) => {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setRole(data.label);
      setId(data.id);
    }
    if (message !== null) {
      // Clear fields
      setRole('');
      setId('');
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

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      const newRole = {
        id,
        label: role,
        updated_by: userId,
      };
      updateRole(newRole);
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
          Update Role
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
            onClick={(e) => onUpdate(e)}
            color='primary'
            className='btn btn-sm'
          >
            Update
          </Button>
          <Button color='secondary' className='btn btn-sm' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
UpdateRole.propTypes = {
  Auth: PropTypes.object.isRequired,
  Role: PropTypes.object.isRequired,
  updateRole: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Role: state.Role,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  updateRole,
})(UpdateRole);
