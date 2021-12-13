import React, { Fragment, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import AttendanceFilter from './AttendanceFilter';
import Breadcrumb from '../../layout/breadcrumb';
const Attendance = () => {
  const students = [
    {
      no: '1',
      admissionNumber: '00973',
      rollNumber: '11133',
      name: 'Raza',
    },
    {
      no: '2',
      admissionNumber: '00975',
      rollNumber: '17627',
      name: 'Imran',
    },
    {
      no: '3',
      admissionNumber: '00976',
      rollNumber: '20013',
      name: 'Ali',
    },
  ];
  const tableColumns = [
    {
      name: '#',
      selector: 'no',
      sortable: true,
      center: true,
    },
    {
      name: 'Admission Number',
      selector: 'admissionNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'Roll Number',
      selector: 'rollNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'Name',
      selector: 'name',
      width: '200px',
      sortable: true,
      center: true,
    },
    {
      name: 'Attendance',
      center: true,
      width: '300px',
      cell: (row) => (
        <div>
          <input type='radio' value='present' name={`${row.name}`} /> Present
          <input type='radio' value='late' name={`${row.name}`} /> Late
          <input type='radio' value='absent' name={`${row.name}`} /> Absent
          <input type='radio' value='halfday' name={`${row.name}`} /> Half Day
        </div>
      ),
    },
  ];
  const history = useHistory();
  const redirect = (url) => {
    history.push(url);
  };
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Attendance' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row>
                  <Col sm={12} md={12}>
                    <AttendanceFilter />
                  </Col>
                </Row>
                <div className='card card-mb-faq xs-mt-search'>
                  <div className='faq-form'>
                    <Row className='justify-content-end'>
                      <Col sm={12} md={6}>
                        <ButtonToolbar style={{ justifyContent: 'flex-end' }}>
                          <ButtonGroup style={{ marginTop: '10px' }}>
                            <Button color='primary' className='btn btn-sm'>
                              <span>Mark As Holiday</span>
                            </Button>
                          </ButtonGroup>
                          <ButtonGroup
                            style={{ marginLeft: '10px', marginTop: '10px' }}
                          >
                            <Button color='secondary' className='btn btn-sm'>
                              <span>Save Attendance</span>
                            </Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Row>
                  <Col lg={12}>
                    <DataTable
                      data={students}
                      columns={tableColumns}
                      striped={true}
                      center={true}
                      pagination={true}
                      persistTableHead
                      noHeader={true}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Attendance;