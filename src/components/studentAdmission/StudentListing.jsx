import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import StudentFilter from './StudentFilter';
import { Dashboard, Male } from '../../constant';
import Breadcrumb from '../../layout/breadcrumb';

const StudentListing = () => {
  const studentListing = [
    {
      admissionNumber: 1,
      regNumber: 132,
      studentName: 'Zaid',
      schoolClass: '10th',
      dateOfBirth: '4-7-2000',
      gender: 'Male',
      contactNumber: '0302-5674323',
      guardianContactNumber: '0302-5674323',
    },
    {
      admissionNumber: 1,
      regNumber: 132,
      studentName: 'Zaid',
      schoolClass: '10th',
      dateOfBirth: '4-7-2000',
      gender: 'Male',
      contactNumber: '0302-5674323',
      guardianContactNumber: '0302-5674323',
    },
  ];

  const tableColumns = [
    {
      name: 'Admission Number',
      selector: 'admissionNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'Registration Number',
      selector: 'regNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'Student Name',
      selector: 'studentName',
      sortable: true,
      center: true,
    },
    {
      name: 'Class',
      selector: 'schoolClass',
      sortable: true,
      center: true,
    },
    {
      name: 'Date of Birth',
      selector: 'dateOfBirth',
      sortable: true,
      center: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
      center: true,
    },
    {
      name: 'Contact Number',
      selector: 'contactNumber',
      width: '150px',
      sortable: true,
      center: true,
    },

    // {
    //   name: 'Status',
    //   selector: 'status',
    //   sortable: true,
    //   center: true,
    // },
    {
      name: 'Guardian Contact Number',
      selector: 'guardianContactNumber',
      width: '150px',
      sortable: true,
      center: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Student Listing' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row>
                    <Col sm={12} md={12}>
                      <StudentFilter />
                    </Col>
                  </Row>

                  <Row>
                    {/* <Col
                      sm={12}
                      md={4}
                      style={{
                        textContent: 'center',
                        justifyContent: 'left',
                        marginTop: '10px',
                      }}
                    > */}
                    {/* <Card>
                        <CardHeader
                          className='b-t-primary b-l-primary'
                          style={{
                            padding: '8px',
                            textContent: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <h6>Total StudentListing</h6>
                        </CardHeader>
                        <CardBody
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            textContent: 'center',
                          }}
                        >
                          <p>54645 </p>
                        </CardBody>
                      </Card>
                    </Col> */}
                    <Col sm={12} md={3}></Col>
                    {/* <Col
                      sm={12}
                      md={5}
                      style={{
                        justifyContent: 'right',
                        marginTop: '10px',
                      }}
                    >
                      <StudentFilter />
                    </Col> */}
                  </Row>
                  {/* <TransitionGroup> */}
                  {/* {filtered === null ? ( */}
                  <DataTable
                    data={studentListing}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination={true}
                    persistTableHead
                    noHeader={true}
                  />
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default StudentListing;
