import React from 'react';
import DataTable from 'react-data-table-component';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableLoader from '../layout/loader/TableLoader';
import { TransitionGroup } from 'react-transition-group';
import CountryFilter from './CountryFilter';

const Countries = ({
  Dashboard: { countriesData, countryFiltered, loading },
}) => {
  const tableColumns = [
    {
      name: 'Country Name',
      selector: 'country',
      sortable: true,
      center: true,
    },
    {
      name: 'No. of Schools',
      selector: 'school_count',
      sortable: true,
      center: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h5>Countries</h5>
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
            <CountryFilter />
          </Col>
        </Row>

        {countriesData !== null ? (
          <TransitionGroup>
            {countryFiltered === null ? (
              <DataTable
                data={countriesData}
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
                data={countryFiltered}
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

Countries.propTypes = {
  Dashboard: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, {})(Countries);
