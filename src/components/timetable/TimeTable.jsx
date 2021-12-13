import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Button,Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import { useHistory } from 'react-router-dom';
import TimeTableFilter from './TimeTableFilter';

const TiemTable = () => {
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
      name: 'Class',
      selector: 'class',
      sortable: true,
      center: true,
    },
    {
      name: 'Section',
      selector: 'section',
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div>
          <button className='btn view-button' onClick={() => viewToggel()}>
            <Eye />
          </button>
        </div>
      ),
    },
  ];

  const history = useHistory();

  const onRedirect = (redirect) => {
    history.push(redirect);
  };

  const viewToggel = ()=> {
    onRedirect(`/timetable/timetable-listing/detail`);
  }

  return (
    <Fragment>
    <Breadcrumb parent={null} title='Timetable' />
    <Container fluid={true}>
      <Card>
        <CardBody>
        <Row className='justify-content-end'>
        <Col sm={12} md={7} style={{ marginTop: '10px' }}>
          <Button
            color='primary'
            className='btn btn-sm'
            onClick={() => onRedirect(`/timetable/add-timetable`)}
          >
            <span>Add Timetable</span>
          </Button>
        </Col>
        <Col sm={12} md={5} style={{ marginTop: '10px' }}>
          <TimeTableFilter />
        </Col>
        </Row>
        <DataTable
            data={schoolDashboard}
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

export default TiemTable;
