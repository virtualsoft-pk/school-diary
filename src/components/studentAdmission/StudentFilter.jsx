import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FormGroup, Form, Row, Col, Button } from 'reactstrap';

const StudentFilter = () => {
  const schools = [
    {
      schoolId: 1,
      schoolName: 'OXIBRIDGE Public School',
      branchName: 'SDK',
      package: 'Silver',
      status: 'Active',
      dues: 0.0,
    },
    {
      schoolId: 2,
      schoolName: 'MTB',
      branchName: 'RYK',
      package: 'Gold',
      status: 'Active',
      dues: 5000,
    },

    {
      schoolId: 3,
      schoolName: 'National Public School',
      branchName: 'Lahore',
      package: 'Platinum',
      status: 'Active',
      dues: 23000,
    },
  ];

  const onSubmit = () => {};

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <div className='date-picker'>
      <Form onSubmit={onSubmit} className='theme-form'>
        <Row>
          <Col sm={12} md={5}>
            <FormGroup className='form-row'>
              <div className='col-sm-2'>
                <label className='col-form-label text-right'>School:</label>
              </div>
              <div className='col-sm-10'>
                <div className='input-group'>
                  <Typeahead
                    id='multiple-typeahead'
                    clearButton
                    // defaultSelected={schools.slice(0, 5)}
                    labelKey='schoolName'
                    // multiple
                    options={schools}
                    placeholder='Filter School....'
                    onChange={(select) => setSelectedSchool(select)}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col sm={12} md={5}>
            <FormGroup className='form-row'>
              <div className='col-sm-2'>
                <label className='col-form-label text-right'>Branch:</label>
              </div>
              <div className='col-sm-10'>
                <div className='input-group'>
                  <Typeahead
                    id='multiple-typeahead'
                    clearButton
                    labelKey='branchName'
                    options={schools}
                    placeholder='Filter Branch....'
                    onChange={(select) => setSelectedBranch(select)}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col sm={12} md={2}>
            <Button
              color='primary'
              className='btn btn-sm float-right'
              type='submit'
            >
              Search
            </Button>
            <br />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentFilter;
