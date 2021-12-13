import React, { useEffect, Fragment, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Container,
} from 'reactstrap';
import { ColoredBreadcrumb, Ribbon } from '../../constant';
import {
  SilverPackage,
  GoldPackage,
  PlatinumPackage,
  TotalPackage,
  Card_Footer,
} from '../../constant';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Edit3 } from 'react-feather';
import { useHistory } from 'react-router-dom';
import AddPackage from './AddPackage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { titleCase } from 'title-case';
import ChartistChart from 'react-chartist';

import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
  smallchart3data,
  smallchart3option,
} from '../dashboard/chartData/ChartistChartsData';

import {
  loadPackages,
  clearError,
  clearMessage,
} from '../../actions/packageAction';
import UpdatePackage from './UpdatePackage';
import TableLoader from '../layout/loader/TableLoader';

const Packages = ({
  Package: { packages, packageCards, error, message },
  loadPackages,
  clearError,
  clearMessage,
}) => {
  const history = useHistory();
  const [togglePackage, setTogglePackage] = useState(false);
  const [packageId, setPackageId] = useState(null);

  const PackageRedirect = (redirect) => {
    history.push({
      pathname: redirect,
      state: {
        id: packageId,
      },
    });
  };

  useEffect(() => {
    loadPackages();
    if (packageId !== null) {
      PackageRedirect(`/virtualsoft/admin/packages/detail`);
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }

    // eslint-disable-next-line
  }, [packageId, message, error]);

  const onTogglePackage = () => {
    if (!togglePackage) {
      setTogglePackage(true);
    } else {
      setTogglePackage(false);
    }
  };

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const viewToggle = (data) => {
    setPackageId(data.id);
  };

  const temp = null;
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Packages' />
      {updateModal && (
        <UpdatePackage modal={updateModal} toggle={updateToggle} data={data} />
      )}

      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <Row className='second-chart-list third-news-update'>
              <Col sm='12' className='chart_data_left box-col-12 mt-3'>
                <Card>
                  <CardBody className='p-0'>
                    <Row className='m-0 chart-main justify-content-between'>
                      {packageCards !== null &&
                        packageCards.map((card, index) => (
                          <Fragment key={index}>
                            <Col xl='3' md='6' sm='6' className='p-0 box-col-6'>
                              <div className='media border-none align-items-center'>
                                <div className='hospital-small-chart'>
                                  <div className='small-bar'>
                                    <ChartistChart
                                      className={
                                        index % 2 === 0
                                          ? 'small-chart flot-chart-container'
                                          : 'small-chart1 flot-chart-container'
                                      }
                                      data={
                                        index % 2 === 0
                                          ? smallchart1data
                                          : smallchart2data
                                      }
                                      options={
                                        index % 2 === 0
                                          ? smallchart1option
                                          : smallchart2option
                                      }
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
                                    {card.total_income !== null ? (
                                      <h4>{card.total_income} </h4>
                                    ) : (
                                      <h4>{0}</h4>
                                    )}

                                    <span>{titleCase(card.package_name)}</span>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Fragment>
                        ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col sm='12' xl='12 ' style={{ marginBottom: '20px' }}>
                <Button
                  className='btn btn-sm'
                  color='primary'
                  onClick={() => onTogglePackage()}
                >
                  Add Package
                </Button>
              </Col>
              {togglePackage && <AddPackage />}

              <Col sm={12} md={12}>
                <section id='pricing' className='pricing'>
                  <div className='container mt-5' data-aos='fade-up'>
                    {packages.length > 0 ? (
                      <Row className='justify-content-center'>
                        {packages &&
                          packages.map((selection, index) => (
                            <Fragment key={index}>
                              <Col
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                                data-aos='fade-up'
                                data-aos-delay='100'
                              >
                                <Card>
                                  <CardBody className='box'>
                                    <h3 id='hover01'>
                                      {selection.label} Package
                                    </h3>
                                    <h5>{selection.price}</h5>
                                    <ul>
                                      <div className='bg-details'>
                                        <div
                                          className='bg-sub'
                                          onClick={() =>
                                            updateToggle(selection)
                                          }
                                        >
                                          Update
                                          <span>
                                            <Edit3 />
                                          </span>
                                        </div>
                                      </div>
                                    </ul>
                                    <div className='btn-wrap'>
                                      <Button
                                        color='primary'
                                        className='btn btn-sm'
                                        onClick={() => viewToggle(selection)}
                                      >
                                        Details
                                      </Button>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Fragment>
                            // <Col
                            //   sm={12}
                            //   md={6}
                            //   lg={3}
                            //   data-aos='fade-up'
                            //   data-aos-delay='100'
                            // >
                            //   <Card>
                            //     <CardBody className='box'>
                            //       <h3 id='hover01'>{selection.label} Package</h3>
                            //       <h5>{selection.price}</h5>
                            //       <div className='btn-wrap'>
                            //         <Button
                            //           color='primary'
                            //           className='btn btn-sm'
                            //           onClick={() =>
                            //             PackageRedirect(`/income/details`)
                            //           }
                            //         >
                            //           Details
                            //         </Button>
                            //       </div>
                            //     </CardBody>
                            //   </Card>
                            // </Col>
                          ))}
                      </Row>
                    ) : (
                      <TableLoader />
                    )}
                  </div>
                </section>
              </Col>
              {/* <Col
                      sm={12}
                      md={6}
                      lg={3}
                      data-aos='fade-up'
                      data-aos-delay='100'
                    >
                      <Card>
                        <CardBody className='box'>
                          <h3 id='hover01'>Gold Package</h3>
                          <h5>3,160,000,00</h5>
                          <div className='btn-wrap'>
                            <Button
                              color='primary'
                              className='btn btn-sm'
                              onClick={() =>
                                PackageRedirect(`/income/details`)
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      data-aos='fade-up'
                      data-aos-delay='100'
                    >
                      <Card>
                        <CardBody className='box'>
                          <h3 id='hover01'>Platinum Package</h3>
                          <h5>3,160,000,00</h5>
                          <div className='btn-wrap'>
                            <Button
                              color='primary'
                              className='btn btn-sm'
                              onClick={() =>
                                PackageRedirect(`/income/details`)
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      data-aos='fade-up'
                      data-aos-delay='100'
                    >
                      <Card>
                        <CardBody className='box'>
                          <h3 id='hover01'>Total Packages</h3>
                          <h5>3,160,000,00</h5>
                          <div className='btn-wrap'>
                            <Button
                              color='primary'
                              className='btn btn-sm'
                              onClick={() =>
                                PackageRedirect(`/income/details`)
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Packages.propTypes = {
  Package: PropTypes.object.isRequired,
  loadPackages: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Package: state.Package,
});

export default connect(mapStateToProps, {
  loadPackages,
  clearError,
  clearMessage,
})(Packages);
