import React, { Fragment } from 'react';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableLoader from '../layout/loader/TableLoader';

const CountryCityData = ({
  Income: { incomeDetails, incomeLoading, incomeFiltered },
}) => {
  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  const tableColumns = [
    {
      name: '#',
      cell: (row, index) => index,
      grow: 0,
      // style: {
      //   borderBottom: '1px solid #FFFFFF',
      //   marginBottom: '-1px',
      // },
    },
    {
      name: 'Country',
      selector: (row) => row.country,
      sortable: true,
      // grow: 2,
      // style: {
      //   color: '#202124',
      //   fontSize: '14px',
      //   fontWeight: 500,
      // },
      center: true,
    },

    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
      // style: {
      //   color: 'rgba(0,0,0,.54)',
      // },

      center: true,
    },
    {
      name: 'Package QTY',
      selector: (row) => row.times,
      sortable: true,
      // style: {
      //   color: 'rgba(0,0,0,.54)',
      // },
      center: true,
    },
    {
      name: 'Revenue',
      selector: 'revenue',
      sortable: true,
      center: true,
    },
  ];

  return (
    <Fragment>
      <TransitionGroup>
        {incomeFiltered === null ? (
          <DataTable
            data={incomeDetails}
            columns={tableColumns}
            striped={true}
            center={true}
            progressPending={incomeLoading}
            progressComponent={<TableLoader/>}
            noHeader={true}
            pagination={true}
          />
        ) : (
          <DataTable
            data={incomeFiltered}
            columns={tableColumns}
            striped={true}
            center={true}
            progressPending={incomeLoading}
            progressComponent={<TableLoader/>}
            noHeader={true}
            pagination={true}
          />
        )}
      </TransitionGroup>
    </Fragment>
  );
};
CountryCityData.propTypes = {
  Income: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Income: state.Income,
});

export default connect(mapStateToProps, {})(CountryCityData);
