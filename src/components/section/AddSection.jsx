import React, { useState, useEffect } from 'react';
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
import { addSection } from '../../actions/sectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddSection = ({
  modal,
  toggle,
  schoolId,
  Auth: { userId },
  getClass,
  addSection,
}) => {
  const [sectionName, setSectionName] = useState('');
  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (sectionName === '') {
      isValid = false;
      errors['sectionName'] = 'Please enter section name.';
    }
    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newSection = {
        label: sectionName,
        school_id: schoolId,
        created_by: userId,
      };

      addSection(newSection);

      // Clear fields
      setSectionName('');
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
          Add Section
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='sectionName'>Section Name</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='sectionName'
                  value={sectionName ? sectionName : ''}
                  placeholder='Enter section name'
                  onChange={(e) => setSectionName(e.target.value)}
                />
                <div className='text-danger'>{errors.sectionName}</div>
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
AddSection.propTypes = {
  Auth: PropTypes.object.isRequired,
  addSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  addSection,
})(AddSection);
