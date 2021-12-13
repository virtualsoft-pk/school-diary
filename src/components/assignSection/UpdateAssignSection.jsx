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
import { addAssignSection } from '../../actions/assignSectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const UpdateAssignSection = ({
  data,
  modal,
  toggle,
  schoolId,
  Class: { classes },
  Section: { sections },
  addAssignSection,
}) => {
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);

  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setSelectedClass(
        classes.filter((Class) => {
          return (
            JSON.stringify(Class.label)
              .toLowerCase()
              .indexOf(data.label.toLowerCase()) !== -1
          );
        })
      );

      setSelectedSection(
        data.class_wise_sections.map(
          (classSection) =>
            sections.filter((section) => {
              return (
                JSON.stringify(section.label)
                  .toLowerCase()
                  .indexOf(classSection.section_name.toLowerCase()) !== -1
              );
            })[0]
        )
      );
    }

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

  const onUpdate = (e) => {
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
          Update Section
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
                  disabled
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

UpdateAssignSection.propTypes = {
  Class: PropTypes.object.isRequired,
  Section: PropTypes.object.isRequired,
  addAssignSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Class: state.Class,
  Section: state.Section,
});

export default connect(mapStateToProps, {
  addAssignSection,
})(UpdateAssignSection);
