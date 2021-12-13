import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, ListGroup,ListGroupItem } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';

const TiemTableDetails = () => {
    const schoolDashboard = [
        {
         id: 1,
         class: "4",
         section: "A",
         timetable: [
            {
                id: 1,
                from: "08:00",
                to: "09:45",
                subject: "Science",
                teacher: "Raza"
            },
             {
                 id: 2,
                 from: "10:00",
                 to: "12:00",
                 subject: "Math",
                 teacher: "Irem"
             }
         ]
        },
        {
            id: 2,
            class: "9",
            section: "C",
            timetable: [
                {
                    id: 1,
                    from: "08:00",
                    to: "09:45",
                    subject: "Science",
                    teacher: "Raza"
                },
                 {
                     id: 2,
                     from: "10:00",
                     to: "12:00",
                     subject: "Math",
                     teacher: "Irem"
                 }
            ]
           },
    
           {
            id: 3,
            class: "7",
            section: "G4",
            timetable: [
                {
                    id: 1,
                    from: "08:00",
                    to: "09:45",
                    subject: "Science",
                    teacher: "Raza"
                },
                 {
                     id: 2,
                     from: "10:00",
                     to: "12:00",
                     subject: "Math",
                     teacher: "Irem"
                 }
            ]
           },
      ];

  const tableColumns = [
    {
      name: 'From',
      selector: 'from',
      sortable: true,
      center: true,
    },
    {
      name: 'To',
      selector: 'to',
      sortable: true,
      center: true,
    },
    {
        name: 'Subject',
        selector: 'subject',
        sortable: true,
        center: true,
    },
    {
    name: 'Teacher',
    selector: 'teacher',
    sortable: true,
    center: true,
    },
  ];

  return (
    <Fragment>
    <Breadcrumb
        parent='Timetable'
        parentLink='/timetable/timetable-listing'
        title='Details'
      />
    <Container fluid={true}>
      <Card>
        <CardBody>
            <Row className="justify-content-between">
            <Col sm={12} md={4}>
                <Row className="justify-content-between">
                    <Col sm={5}>
                    <h6>Class:</h6>
                    </Col>
                    <Col sm={5}>
                    {schoolDashboard[0].class}
                    </Col>
                </Row>
                </Col>
              <Col sm={12} md={4}>
                <Row className="justify-content-between">
                    <Col sm={5}>
                    <h6>Section:</h6>
                    </Col>
                    <Col sm={5}>
                    {schoolDashboard[0].section}
                    </Col>
                </Row>
              </Col>
            </Row>
        <DataTable
            data={schoolDashboard[0].timetable}
            columns={tableColumns}
            striped={true}
            center={true}
            pagination={true}
            persistTableHead
            noHeader={true}
            />
        </CardBody>
      </Card>
    </Container>
    </Fragment>
  );
};

export default TiemTableDetails;
