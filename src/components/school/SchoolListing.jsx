import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChartistChart from 'react-chartist';

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

import SchoolFilter from './SchoolFilter';
import Schools from './Schools';
import Breadcrumb from '../../layout/breadcrumb';

const SchoolListing = ({
  School: { renewRequest, totalSchools, totalStudents },
}) => {
  const history = useHistory();

  const AddSchoolRedirect = (redirect) => {
    history.push(redirect);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Schools' />
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <Row className='second-chart-list third-news-update'>
              <Col sm='12' className='chart_data_left box-col-12 mt-3'>
                <Card>
                  <CardBody className='p-0'>
                    <Row className='m-0 chart-main'>
                      <Col xl='4' md='6' sm='6' className='p-0 box-col-6'>
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

                              <span>Schools</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl='4' md='6' sm='6' className='p-0 box-col-6'>
                        <div className='media border-none align-items-center'>
                          <div className='hospital-small-chart'>
                            <div className='small-bar'>
                              <ChartistChart
                                className='small-chart1 flot-chart-container'
                                data={smallchart2data}
                                options={smallchart2option}
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
                              <span>Students</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl='4' md='6' sm='6' className='p-0 box-col-6'>
                        <div className='media border-none align-items-center'>
                          <div className='hospital-small-chart'>
                            <div className='small-bar'>
                              <ChartistChart
                                className='small-chart2 flot-chart-container'
                                data={smallchart3data}
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
                              {renewRequest !== null ? (
                                <h4>{renewRequest}</h4>
                              ) : (
                                <h4>{0}</h4>
                              )}

                              <span>Renew Requests</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={7} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      className='btn btn-sm'
                      onClick={() =>
                        AddSchoolRedirect(
                          `/virtualsoft/admin/school/add-school`
                        )
                      }
                    >
                      <span>AddSchool</span>
                    </Button>
                  </Col>
                  <Col sm={12} md={5} style={{ marginTop: '10px' }}>
                    <SchoolFilter />
                  </Col>
                </Row>

                <Schools />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

SchoolListing.propTypes = {
  School: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
});

export default connect(mapStateToProps, {})(SchoolListing);
