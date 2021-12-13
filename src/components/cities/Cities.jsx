import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import CitiesFilter from './CitiesFilter';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableLoader from '../layout/loader/TableLoader';
import { TransitionGroup } from 'react-transition-group';

const Cities = ({ Dashboard: { citiesData, loading, cityFiltered } }) => {
  const [cityName, setCityName] = useState(null);

  const history = useHistory();

  const ViewCitySchoolRedirect = (redirect) => {
    history.push({
      pathname: redirect,
      state: {
        name: cityName,
      },
    });
  };

  useEffect(() => {
    if (cityName !== null) {
      ViewCitySchoolRedirect(`/virtualsoft/admin/dashboard/schools`);
    }

    //eslint-disable-next-line
  }, [cityName]);

  const tableColumns = [
    {
      name: 'City ID',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'City Name',
      selector: 'city',
      sortable: true,
      center: true,
    },
    {
      name: 'No. Of Schools',
      selector: 'school_count',
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

  const viewToggle = (data) => {
    setCityName(data.city);
  };

  return (
    <Card>
      <CardHeader>
        <h5>Cities</h5>
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
            <CitiesFilter />
          </Col>
        </Row>
        {citiesData !== null ? (
          <TransitionGroup>
            {cityFiltered === null ? (
              <DataTable
                data={citiesData}
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
                data={cityFiltered}
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
Cities.propTypes = {
  Dashboard: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, {})(Cities);
