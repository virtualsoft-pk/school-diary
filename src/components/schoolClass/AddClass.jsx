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
// import { titleCase } from 'title-case';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addClass } from '../../actions/classAction';

const AddClass = ({ modal, toggle, addClass, Auth: { user, userId } }) => {
  const [className, setClassName] = useState('');

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (className === '') {
      isValid = false;
      errors['className'] = 'Please enter class name.';
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (user) {
        const newClass = {
          label: className,
          school_id: user.school_id,
          created_by: userId,
        };
        addClass(newClass);

        // Clear fields
        setClassName('');
        toggle();
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
          Add Class
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='className'>Class Name</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='className'
                  value={className ? className : ''}
                  placeholder='Enter class name'
                  onChange={(e) => setClassName(e.target.value)}
                />
                <div className='text-danger'>{errors.className}</div>
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

AddClass.propTypes = {
  Auth: PropTypes.object.isRequired,
  addClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  addClass,
})(AddClass);
