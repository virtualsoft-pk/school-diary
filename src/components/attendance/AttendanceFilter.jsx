import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const AttendanceFilter = () => {
  const schoolClass = [
    {
      className: 'FSC',
      section: 'B',
    },
    {
      className: 'Matric',
      section: 'C',
    },
    {
      className: 'FSC',
      section: 'F',
    },
  ];

  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(moment(new Date()));

  const onClassChange = (className) => {
    setSelectedClass(className);
  };

  const onSectionChange = (section) => {
    setSelectedSection(section);
  };

  const onSubmit = () => {};

  let inputProps = {
    placeholder: 'Attendance date',
  };
  return (
    <div className='date-picker'>
      <Form onSubmit={onSubmit} className='theme-form'>
        <Row className='row justify-content-between'>
          <Col sm={12} md={4}>
            <FormGroup>
              <Label htmlFor='class'>Class</Label>
              <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey='className'
                options={schoolClass}
                placeholder='Select Class....'
                onChange={(data) => onClassChange(data)}
              />
            </FormGroup>
          </Col>

          <Col sm={12} md={4}>
            <FormGroup>
              <Label htmlFor='section'>Section</Label>
              <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey='section'
                options={schoolClass}
                placeholder='Select Section....'
                onChange={(data) => onSectionChange(data)}
              />
            </FormGroup>
          </Col>

          <Col sm={12} md={4}>
            <FormGroup>
              <Label htmlFor='attendanceDate'>Attendance Date</Label>
              <Datetime
                timeFormat={false}
                dateFormat='YYYY-MM-DD'
                inputProps={inputProps}
                value={attendanceDate ? attendanceDate : 'YYYY-MM-DD'}
                onChange={(date) => setAttendanceDate(date)}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AttendanceFilter;
