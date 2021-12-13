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
import { updateClass } from '../../actions/classAction';

const UpdateClass = ({
  data,
  modal,
  toggle,
  updateClass,
  Auth: { user, userId },
}) => {
  const [className, setClassName] = useState('');
  const [id, setId] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setClassName(data.label);
      setId(data.id);
    }

    // eslint-disable-next-line
  }, []);

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

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      if (user) {
        const newClass = {
          id,
          label: className,
          school_id: user.school_id,
          updated_by: userId,
        };
        updateClass(newClass);

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
          Update Class
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

UpdateClass.propTypes = {
  Auth: PropTypes.object.isRequired,
  updateClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  updateClass,
})(UpdateClass);
