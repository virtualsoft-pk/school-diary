import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import { Dashboard } from '../../constant';
import ChartistChart from 'react-chartist';

import {
  smallchart1option,
  smallchart1data,
} from '../dashboard/chartData/ChartistChartsData';
import SchoolStudentFilter from './SchoolStudentFilter';

const School = () => {
  const [students, setStudents] = useState(30000);

  const schools = [
    {
      regNo: 1,
      name: 'Zaid',
      class: '8th',
      section: 'white',
    },
    {
      regNo: 2,
      name: 'Farhan',
      class: '5th',
      section: 'pink',
    },
    {
      regNo: 3,
      name: 'Asif',
      class: '7th',
      section: 'blue',
    },
  ];

  const tableColumns = [
    {
      name: 'Reg No.',
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
  ];

  return (
    <Fragment>
      <Breadcrumb
        parent='City Schools'
        parentLink='/virtualsoft/admin/dashboard/schools'
        title='School'
      />

      <Container fluid={true}>
        <Row className='second-chart-list third-news-update'>
          <Col sm={12} md={4}>
            <Card className='b-r-primary b-l-primary b-t-primary b-b-primary'>
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
        </Row>

        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row className='justify-content-end'>
                    <Col sm={12} md={5}>
                      <SchoolStudentFilter />
                    </Col>
                  </Row>
                  {/* <TransitionGroup> */}
                  {/* {filtered === null ? ( */}
                  <DataTable
                    data={schools}
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

export default School;
