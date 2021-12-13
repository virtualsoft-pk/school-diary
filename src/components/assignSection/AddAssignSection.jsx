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
  Label,
} from 'reactstrap';
import { addAssignSection } from '../../actions/assignSectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getClass } from '../../actions/classAction';
import { getSection } from '../../actions/sectionAction';

const AddAssignSection = ({
  modal,
  toggle,
  schoolId,
  Auth: { userId },
  Class: { classes },
  Section: { sections },
  getClass,
  getSection,
  addAssignSection,
}) => {
  const [errors, setErrors] = useState('');
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);

  useEffect(() => {
    getClass(schoolId);
    getSection(schoolId);
    // eslint-disable-next-line
  }, [schoolId]);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (selectedClass.length <= 0) {
      isValid = false;
      errors['selectedClass'] = 'Please select Class.';
    }
    if (selectedSection.length <= 0) {
      isValid = false;
      errors['selectedSection'] = 'Please select Section.';
    }
    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newSection = {
        class_id: selectedClass.length !== 0 && selectedClass[0].id,
        school_id: schoolId,
        sections:
          selectedSection.length !== 0 &&
          selectedSection.map((section) => ({
            section_id: section.id,
          })),
      };

      addAssignSection(newSection);

      // Clear fields
      setSelectedClass([]);
      setSelectedSection([]);
      toggle();
    }
  };

  const onClassesChange = (classes) => {
    setSelectedClass(classes);
  };
  const onSectionsChange = (sections) => {
    setSelectedSection(sections);
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
                <Label htmlFor='classes'>Select Class</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='label'
                  options={classes !== null ? classes : []}
                  selected={selectedClass}
                  placeholder='Select Class....'
                  onChange={(data) => onClassesChange(data)}
                />

                <div className='text-danger'>{errors.selectedClass}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='sections'>Select section</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='label'
                  options={sections !== null ? sections : []}
                  selected={selectedSection}
                  placeholder='Select Section....'
                  onChange={(data) => onSectionsChange(data)}
                  // id="basic-typeahead-multiple"
                  multiple
                />

                <div className='text-danger'>{errors.selectedSection}</div>
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
AddAssignSection.propTypes = {
  Auth: PropTypes.object.isRequired,
  Class: PropTypes.object.isRequired,
  Section: PropTypes.object.isRequired,
  addAssignSection: PropTypes.func.isRequired,
  getSection: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Class: state.Class,
  Auth: state.Auth,
  Section: state.Section,
});

export default connect(mapStateToProps, {
  addAssignSection,
  getClass,
  getSection,
})(AddAssignSection);
