import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import ChartistChart from 'react-chartist';

import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
  smallchart3data,
  smallchart3option,
} from '../dashboard/chartData/ChartistChartsData';

import CountryCityFilter from './CountryCityFilter';
import CountryCityData from './CountryCityData';
import Breadcrumb from '../../layout/breadcrumb';
import { incomeDetails } from '../../actions/incomeAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';

const Details = ({
  Income: {
    totalRevenue,
    totalSoldPackages,
    totalActivePackages,
    incomeLoading,
  },
  incomeDetails,
}) => {
  const history = useHistory();
  const [packageId, setPackageId] = useState(history.location.state?.id);

  useEffect(() => {
    if (!packageId || packageId === null || packageId === undefined) {
      IncomeRedirect('/virtualsoft/admin/income');
    } else {
      const data = { package_id: packageId };
      incomeDetails(data);
    }
    //eslint-disable-next-line
  }, []);

  const IncomeRedirect = (redirect) => {
    history.push(redirect);
  };

  return (
    <Fragment>
      <Breadcrumb
        parent='Income'
        parentLink='/virtualsoft/admin/income'
        title='Details'
      />
      <Container fluid={true}>
        {!incomeLoading ? (
          <Row>
            <Col sm='12'>
              <Row className='second-chart-list third-news-update'>
                <Col sm='12' className='chart_data_left box-col-12 mt-3'>
                  <Card>
                    <CardBody className='p-0'>
                      <Row className='m-0 chart-main '>
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
                                {totalSoldPackages !== null ? (
                                  <h4>{totalSoldPackages}</h4>
                                ) : (
                                  <h4>{0}</h4>
                                )}

                                <span>Sold Package</span>
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
                                {totalActivePackages !== null ? (
                                  <h4>{totalActivePackages}</h4>
                                ) : (
                                  <h4>{0}</h4>
                                )}

                                <span>Active Package</span>
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
                                  options={smallchart3option}
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
                                {totalRevenue !== null ? (
                                  <h4>{totalRevenue}</h4>
                                ) : (
                                  <h4>{0}</h4>
                                )}

                                <span>Revenue</span>
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
                    <Col sm={12} md={5} style={{ marginTop: '10px' }}>
                      <CountryCityFilter />
                    </Col>
                  </Row>

                  <CountryCityData />
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <TableLoader />
        )}
      </Container>
    </Fragment>
  );
};
Details.propTypes = {
  Income: PropTypes.object.isRequired,
  incomeDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Income: state.Income,
});

export default connect(mapStateToProps, {
  incomeDetails,
})(Details);
