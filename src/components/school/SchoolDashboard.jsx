import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import SchoolFilter from './SchoolDashboardFilter';
import { Dashboard } from '../../constant';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableLoader from '../layout/loader/TableLoader';
import { TransitionGroup } from 'react-transition-group';

const SchoolDashboard = ({
  Dashboard: { schoolData, schoolFiltered, loading },
}) => {
  const tableColumns = [
    {
      name: 'School ID',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'School Name',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Package',
      selector: 'current_package',
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      center: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h5>School</h5>
      </CardHeader>

      <CardBody>
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
            <SchoolFilter />
          </Col>
        </Row>

        {schoolData !== null ? (
          <TransitionGroup>
            {schoolFiltered === null ? (
              <DataTable
                data={schoolData}
                columns={tableColumns}
                striped={true}
                center={true}
                progressPending={loading}
                progressComponent={<TableLoader />}
                noHeader={true}
                pagination={true}
              />
            ) : (
              <DataTable
                data={schoolFiltered}
                columns={tableColumns}
                striped={true}
                center={true}
                progressPending={loading}
                progressComponent={<TableLoader />}
                noHeader={true}
                pagination={true}
              />
            )}
          </TransitionGroup>
        ) : (
          <TableLoader />
        )}
      </CardBody>
    </Card>
  );
};
SchoolDashboard.propTypes = {
  Dashboard: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, {})(SchoolDashboard);
