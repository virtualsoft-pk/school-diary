import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import ChartistChart from 'react-chartist';
import { ArrowDown } from 'react-feather';
import { Link } from 'react-router-dom';

import RenewablePackage from '../renewablePackage/RenewablePackage';

import { useHistory } from 'react-router-dom';

import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
  smallchart3data,
  smallchart3option,
  smallchart4data,
  smallchart4option,
} from './chartData/ChartistChartsData';

const TableColumn = (props) => {
  const [togglePackage, setTogglePackage] = useState(false);

  const [Package, setPackage] = useState(53);

  const history = useHistory();

  const onTogglePackage = () => {
    if (!togglePackage) {
      setTogglePackage(true);
    } else {
      setTogglePackage(false);
    }
  };

  const RenewablePackageRedirect = (redirect) => {
    history.push(redirect);
  };

  return (
    <Fragment>
      {/* <div className="container-fluid">
        <div className="col-md-12 border" id="new-colum">
          <h4>Renewable Packages</h4>
          <div className="row">

            <div className="col-md-3 col-lg-3 border mt-3"id="new-colum1">
              <div className="row">
                <div className="col-md-11 m-auto  ">

                  <div className="d-flex" >
                    <div className="system">
                   <ArrowDown />
                    </div>
                    <div className="system-1">
                      <h4> 3</h4>
                      <p >Current Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-lg-3 border mt-3"id="new-colum2">
              <div className="row">
                <div className="col-md-11 m-auto  ">

                  <div className="d-flex" >
                    <div className="system">
                   <ArrowDown />
                    </div>
                    <div className="system-1">
                      <h4> 7</h4>
                      <p >Week Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-md-3 col-lg-3 border  mt-3"id="new-colum3">
              <div className="row">
                <div className="col-md-11 m-auto  ">

                  <div className="d-flex" >
                    <div className="system">
                   <ArrowDown />
                    </div>
                    <div className="system-1">
                      <h4> 20</h4>
                      <p >20 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-lg-3 border mt-3"id="new-colum4">
              <div className="row">
                <div className="col-md-11 m-auto  ">

                  <div className="d-flex" >
                    <div className="system">
                   <ArrowDown />
                    </div>
                    <div className="system-1">
                      <h4> 30</h4>
                      <p >30 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Row className='second-chart-list third-news-update'>
        <Col sm='12' className='chart_data_left box-col-12 mt-3'>
          <Card>
            <CardHeader>
              <h5>Renewable Packages</h5>
            </CardHeader>
            <CardBody className='p-0'>
              <Row className='m-0 chart-main'>
                <Col
                  xl='3'
                  md='6'
                  sm='6'
                  className='p-0 box-col-6'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onTogglePackage()}
                >
                  <div className='media align-items-center'>
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
                        {props.currentDay !== null ? (
                          <h4>{props.currentDay}</h4>
                        ) : (
                          <h4>{0}</h4>
                        )}

                        <span>
                          Current Day <ArrowDown />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col
                  xl='3'
                  md='6'
                  sm='6'
                  className='p-0 box-col-6'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onTogglePackage()}
                >
                  <div className='media align-items-center'>
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
                        {props.weekLeft !== null ? (
                          <h4>{props.weekLeft}</h4>
                        ) : (
                          <h4>{0}</h4>
                        )}
                        <span>
                          Week Left <ArrowDown />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  xl='3'
                  md='6'
                  sm='6'
                  className='p-0 box-col-6'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onTogglePackage()}
                >
                  <div className='media align-items-center'>
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
                        {props.days !== null ? (
                          <h4>{props.days}</h4>
                        ) : (
                          <h4>{0}</h4>
                        )}

                        <span>
                          15 Days <ArrowDown />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  xl='3'
                  md='6'
                  sm='6'
                  className='p-0 box-col-6'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onTogglePackage()}
                >
                  {/* Redirect(`${process.env.PUBLIC_URL}/income`) */}
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
                        {props.month !== null ? (
                          <h4>{props.month}</h4>
                        ) : (
                          <h4>{0}</h4>
                        )}
                        <span>
                          29 Days
                          <ArrowDown />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        {togglePackage && (
          <Col sm={12} sm={12}>
            <RenewablePackage />
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default TableColumn;
