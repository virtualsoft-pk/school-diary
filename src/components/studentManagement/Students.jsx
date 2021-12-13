import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import ViewStudent from './ViewStudent';
import CountryStateCitySchoolFilter from '../filter/CountryStateCitySchoolFilter';
import StudentFilter from './StudentFilter';
import Breadcrumb from '../../layout/breadcrumb';
import { useHistory } from 'react-router-dom';

const Students = () => {
  const history = useHistory();

  const ViewStudentRedirect = (redirect) => {
    history.push(redirect);
  };

  const students = [
    {
      regNo: 1,
      name: 'Zaid',
      parentName: 'Aziz',
      currentClass: '8th',
      phone: '0308-16548732',
      parentPhone: '0308-16548732',
      CNIC: '3287-98769854',
      parentCNIC: '3287-98769854',
    },
    {
      regNo: 2,
      name: 'Asif',
      parentName: 'Ali',
      currentClass: '5th',
      phone: '0300-08978642',
      parentPhone: '0308-16548732',
      CNIC: '3287-98769854',
      parentCNIC: '3287-98769854',
    },
    {
      regNo: 3,
      parentName: 'Faiz',
      name: 'Motabar',
      currentClass: '6th',
      phone: '0302-10970452',
      parentPhone: '0308-16548732',
      CNIC: '3287-98769854',
      parentCNIC: '3287-98769854',
    },
  ];

  const tableColumns = [
    {
      name: 'RegNo.',
      selector: 'regNo',
      sortable: true,
      center: true,
    },

    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Parent Name',
      selector: 'parentName',
      sortable: true,
      center: true,
    },

    {
      name: 'Current Class',
      selector: 'currentClass',
      sortable: true,
      center: true,
    },

    {
      name: 'Phone',
      selector: 'phone',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'Parent Phone',
      selector: 'parentPhone',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'CNIC',
      selector: 'CNIC',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'Parent CNIC',
      selector: 'parentCNIC',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div>
          <button className='btn view-button' onClick={() => viewToggle(row)}>
            <Eye />
          </button>
        </div>
      ),
    },
  ];

  const [viewModal, setViewModal] = useState(false);
  const [student, setStudent] = useState(null);

  const viewToggle = (data) => {
    ViewStudentRedirect(`/student-management/student-profile`);
  };
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Student Management' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row>
                    <Col sm={12} md={12}>
                      <CountryStateCitySchoolFilter />
                    </Col>
                  </Row>

                  <Row className="justify-content-between">

                     <Col 
                      sm={12}
                      md={4}
                      className="total-student">
                      <Card  className='b-r-primary b-l-primary b-t-primary b-b-primary'>
                        <CardHeader
                          style={{
                            padding: '8px',
                            textContent: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <h6>Total Students</h6>
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
                    </Col>
                    
                    <Col
                      sm={12}
                      md={5}
                    >
                      <StudentFilter />
                    </Col>
                  </Row>

                  <DataTable
                    data={students}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination={true}
                    persistTableHead
                    noHeader={true}
                    style={{
                      marginTop: '-50px',
                    }}
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

export default Students;
