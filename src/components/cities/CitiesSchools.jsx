import React, { useState, Fragment, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import CitiesSchoolsFilter from './CitiesSchoolsFilter';
import Breadcrumb from '../../layout/breadcrumb';
import ChartistChart from 'react-chartist';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableLoader from '../layout/loader/TableLoader';
import { TransitionGroup } from 'react-transition-group';

import {
  smallchart4data,
  smallchart4option,
  smallchart1data,
  smallchart1option,
} from '../dashboard/chartData/ChartistChartsData';
import { loadSchools } from '../../actions/citySchoolsAction';
import { useHistory } from 'react-router-dom';

const CitiesSchools = ({
  CitySchool: {
    schools,
    totalSchools,
    schoolFiltered,
    schoolLoading,
    totalStudents,
  },
  loadSchools,
}) => {
  const history = useHistory();
  const [cityName, setCityName] = useState(history.location.state?.name);

  useEffect(() => {
    if (!cityName || cityName === null || cityName === undefined) {
      Redirect('/virtualsoft/admin/dashboard');
    } else {
      loadSchools(cityName);
    }
    // eslint-disable-next-line
  }, []);

  const Redirect = (redirect) => {
    history.push(redirect);
  };

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
      name: 'Students',
      selector: 'no_of_stds',
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div>
          <button className='btn view-button' onClick={() => viewToggel(row)}>
            <Eye />
          </button>
        </div>
      ),
    },
  ];

  const viewToggel = (data) => {
    Redirect(`/virtualsoft/admin/dashboard/schools/school`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='City Schools' />

      <Container fluid={true}>
        <Row className='second-chart-list third-news-update'>
          <Col sm='12' className='chart_data_left box-col-12 mt-3'>
            <Card>
              <CardBody className='p-0'>
                <Row className='row justify-content-between m-0 chart-main'>
                  <Col xl='4' md='6' sm='6' className='p-0 box-col-4'>
                    <div className='media border-none align-items-center'>
                      <div className='hospital-small-chart'>
                        <div className='small-bar'>
                          <ChartistChart
                            className='small-chart flot-chart-container'
                            data={smallchart1data}
                            options={smallchart1option}
                            type={'Bar'}
                            listener={{
                              draw: function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px',
                                  });
                                }
                              },
                            }}
                          />
                        </div>
                      </div>

                      <div className='media-body'>
                        <div className='right-chart-content'>
                          {totalSchools !== null ? (
                            <h4>{totalSchools}</h4>
                          ) : (
                            <h4>{0}</h4>
                          )}
                          <span>Total Schools</span>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xl='4' md='6' sm='6' className='p-0 box-col-4'>
                    <div className='media border-none align-items-center'>
                      <div className='hospital-small-chart'>
                        <div className='small-bar'>
                          <ChartistChart
                            className='small-chart3 flot-chart-container'
                            data={smallchart4data}
                            options={smallchart4option}
                            type={'Bar'}
                            listener={{
                              draw: function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px',
                                  });
                                }
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className='media-body'>
                        <div className='right-chart-content'>
                          {totalStudents !== null ? (
                            <h4>{totalStudents}</h4>
                          ) : (
                            <h4>{0}</h4>
                          )}
                          <span>Total Students</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <Card>
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
                    <CitiesSchoolsFilter />
                  </Col>
                </Row>
                {schools !== null ? (
                  <TransitionGroup>
                    {schoolFiltered === null ? (
                      <DataTable
                        data={schools}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={schoolLoading}
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
                        progressPending={schoolLoading}
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
CitiesSchools.propTypes = {
  Dashboard: PropTypes.object.isRequired,
  CitySchool: PropTypes.object.isRequired,
  loadSchools: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
  CitySchool: state.CitySchool,
});

export default connect(mapStateToProps, { loadSchools })(CitiesSchools);
