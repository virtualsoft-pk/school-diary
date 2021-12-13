import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import { Dashboard } from '../../constant';
import ChartistChart from 'react-chartist';
import Charts from '../dashboard/Charts';

import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
  smallchart3data,
  smallchart3option,
  smallchart4data,
  smallchart4option,
} from '../dashboard/chartData/ChartistChartsData';

import RenewableFilter from './RenewableFilter';

const RenewablePackage = () => {
  const [schools, setSchools] = useState(307);
  const [cities, setCities] = useState(53);
  const [countries, setCountries] = useState(7);
  const [income, setIncome] = useState(9876000);

  const renewablePackage = [
    {
      countryId: 203078,
      countryName: 'Nepal',
      noOfSchools: 83002,
    },
    {
      countryId: 100328,
      countryName: 'Chicago',
      noOfSchools: 330090,
    },
  ];

  const tableColumns = [
    {
      name: 'Country Id.',
      selector: 'countryId',
      sortable: true,
      center: true,
    },
    {
      name: 'Country Name',
      selector: 'countryName',
      sortable: true,
      center: true,
    },
    {
      name: 'No. of Schools',
      selector: 'noOfSchools',
      sortable: true,
      center: true,
    },
  ];

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row className='row justify-content-between'>
                    <Col sm={12} md={3}></Col>
                    <Col
                      sm={12}
                      md={5}
                      style={{
                        justifyContent: 'right',
                        marginTop: '10px',
                      }}
                    >
                      <RenewableFilter />
                    </Col>
                  </Row>
                  <DataTable
                    data={renewablePackage}
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

export default RenewablePackage;
