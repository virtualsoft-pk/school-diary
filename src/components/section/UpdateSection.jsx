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
// import { titleCase } from 'title-case';
import { updateSection } from '../../actions/sectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { titleCase } from 'title-case';
import { getClass } from '../../actions/classAction';

const UpdateSection = ({
  data,
  modal,
  toggle,
  schoolId,
  Class: { classes },
  Auth: { userId },
  getClass,
  updateSection,
}) => {
  const [sectionName, setSectionName] = useState(data.label);
  const [sectionId, setSectionId] = useState(data.id);
  const [classId, setClassId] = useState(data.class_id);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    getClass(schoolId);
    // eslint-disable-next-line
  }, [schoolId]);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (sectionName === '') {
      isValid = false;
      errors['sectionName'] = 'Please enter section name.';
    }

    if (classId === '') {
      isValid = false;
      errors['classId'] = 'Please select class';
    }

    setErrors(errors);

    return isValid;
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      const newSection = {
        id: sectionId,
        label: sectionName,
        updated_by: userId,
      };

      updateSection(newSection);

      // Clear fields
      setSectionName('');
      setClassId('');
      setSectionId('');
      toggle();
    }
  };

  const onClassChange = (e) => {
    const sectionClass = classes[e.target.value];
    setClassId(sectionClass.id);
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
          Update Section
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='classId'>Class</Label>
                <Input
                  name='classId'
                  className='form-control digits'
                  style={{ width: '100%' }}
                  type='select'
                  value={classId ? classId.label : ''}
                  onChange={onClassChange}
                  disabled
                >
                  <option disabled value=''>
                    Select
                  </option>
                  {classes &&
                    classes.map((selection, index) => (
                      <option key={selection.id} value={index}>
                        {selection.label}
                      </option>
                    ))}
                </Input>

                <div className='text-danger'>{errors.classId}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='section'>Section Name</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='sectionName'
                  value={sectionName ? sectionName : ''}
                  placeholder='Enter Section name'
                  onChange={(e) => setSectionName(e.target.value)}
                />
                <div className='text-danger'>{errors.sectionName}</div>
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

UpdateSection.propTypes = {
  Auth: PropTypes.object.isRequired,
  Class: PropTypes.object.isRequired,
  updateSection: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Class: state.Class,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  updateSection,
  getClass,
})(UpdateSection);
