import React, { Fragment, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash, Eye } from 'react-feather';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
 
const Schools = () =>
  {
    const schools = [
      {
        schoolId:"1",
        schoolName: 'MTB',
        location: 'SDK',
        branch: 'Sadiqabad',
        postalCode: '4037',
        principal: 'Zaid',
        salesPersonId: '2',
        noOfStudent: 1500,
        packages: 'Gold',
        price: 55000,
        payAmount: 30000,
        blockDate: "2021-02-23"
      },
      {
        schoolId:"2",
        schoolName: 'Punjab',
        location: 'RYK',
        branch: 'RYK',
        postalCode: '4337',
        principal: 'Asif',
        salesPersonId: '3',
        noOfStudent: 1000,
        packages: 'Silver',
        price: 35000,
        payAmount: 20000,
        blockDate: "2021-07-05"
      },
      {
        schoolId:"3",
        schoolName: 'MTB',
        location: 'SDK',
        branch: 'Sadiqabad',
        postalCode: '4037',
        principal: 'Zaid',
        salesPersonId: '2',
        noOfStudent: 1500,
        packages: 'Gold',
        price: 55000,
        payAmount: 30000,
        blockDate: "2020-10-13"
      },
    ];

    const tableColumns = [
      {
        name: 'School ID',
        selector: 'schoolId',
        sortable: true,
        center: true,
      },
      {
        name: 'School Name',
        selector: 'schoolName',
        sortable: true,
        center: true,
      },
      {
        name: 'Branch',
        selector: 'branch',
        sortable: true,
        center: true,
      },
      {
        name: 'Block Date',
        selector: 'blockDate',
        width: '200px',
        sortable: true,
        center: true,
      },

    ];

    const [data, setData] = useState(null);
    const history = useHistory();

    const redirect =(url)=>{
      history.push(url)
    }


    return (
      <Fragment>
        <DataTable
          data={schools}
          columns={tableColumns}
          striped={true}
          center={true}
          persistTableHead
          noHeader={true}
          pagination={true}
        />

       
      </Fragment>
    );
  };

export default Schools;
