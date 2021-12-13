import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import ChartistChart from 'react-chartist';

import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
  smallchart3data,
  smallchart3option,
  smallchart4data,
  smallchart4option
} from '../dashboard/chartData/ChartistChartsData';

import SchoolFilter from './SchoolFilter';
import Schools from './Schools';
import Breadcrumb from '../../layout/breadcrumb';


const BlockList = () => {
    const history = useHistory();

    const [renewRequest, setRenewRequest] = useState(30);
    const [blockSchool, setBlockSchool] = useState(35400);
    const [schools, setSchools] = useState(500040);
  
  
    return (
      <Fragment>
        <Breadcrumb parent={null} title='Block List' />
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <Row className='second-chart-list third-news-update'>
                <Col sm='12' className='chart_data_left box-col-12 mt-3'>
                  <Card>
                    <CardBody className='p-0'>
                      <Row className='row justify-content-between m-0 chart-main'>
                        <Col xl='4' md='6' sm='6' className='p-0 box-col-4' >
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
                                {schools !== null ? (
                                  <h4>{schools}</h4>
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
                        {blockSchool !== null ? (
                                  <h4>{blockSchool}</h4>
                                ) : (
                                  <h4>{0}</h4>
                                )}
                                <span>Block Schools</span>
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
                    <Col sm={12} md={4}>
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
  
export default BlockList
