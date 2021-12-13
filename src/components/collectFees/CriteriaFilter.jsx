import React, { useState } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CriteriaFilter = ({}) => {
  const schools = [
    {
      schoolName: 'MTB',
      section: 'A1',
    },
    {
      schoolName: 'Punjab',
      section: 'A1',
    },
    {
      schoolName: 'MTB',
      section: 'A1',
    },
  ];
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);

  const onClassChange = (className) => {
    setSelectedClass(className);
  };
  const onSectionChange = (section) => {
    setSelectedSection(section);
  };
  const onSubmit = () => {};

  return (
    <div className='div'>
      <div className='date-picker'>
        <Form onSubmit={onSubmit} className='theme-form'>
          <Row className='row justify-content-between'>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='className'>Class</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='className'
                  options={schools}
                  placeholder='Select Class....'
                  onChange={(data) => onClassChange(data)}
                />
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='section'>Section</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='section'
                  options={schools}
                  placeholder='Select Section....'
                  onChange={(data) => onSectionChange(data)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            type='submit'
            className='btn btn-sm float-left'
            color='primary'
            // onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CriteriaFilter;
