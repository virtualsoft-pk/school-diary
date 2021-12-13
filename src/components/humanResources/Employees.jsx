import React, { Fragment, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash, Eye } from 'react-feather';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

const Employees = () => {
  const employees = [
    {
      regNumber: '1',
      name: 'Ali',
      dateOfBirth: '2003-04-28',
      gender: 'male',
      phoneNumber: '12345435354',
      status: 'active',
    },
    {
      regNumber: '2',
      name: 'Hira',
      dateOfBirth: '1996-06-24',
      gender: 'female',
      phoneNumber: '12345342354',
      status: 'in-active',
    },
    {
      regNumber: '3',
      name: 'Ahmad',
      dateOfBirth: '1999-09-11',
      gender: 'male',
      phoneNumber: '2313435354',
      status: 'active',
    },
  ];

  const tableColumns = [
    {
      name: 'Reg#',
      selector: 'regNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'EmployeeName',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'DateOfBirth',
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
      name: 'PhoneNumber',
      selector: 'phoneNumber',
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      center: true,
      cell: (row) => (
        <p
          className={
            row.status === 'in-active'
              ? 'f-12 font-danger'
              : 'f-12 font-success'
          }
        >
          {row.status}
        </p>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Employees' />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <DataTable
              data={employees}
              columns={tableColumns}
              striped={true}
              center={true}
              persistTableHead
              noHeader={true}
              pagination={true}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Employees;
