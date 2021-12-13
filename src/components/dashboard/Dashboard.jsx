import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, CardHeader, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getDashboard, clearError } from '../../actions/dashboardAction';
import ChartistChart from 'react-chartist';
import Charts from './Charts';
import BarChart from './BarChart';
import {
  Square,
  Circle,
  Hexagon,
  DollarSign,
  Layers,
  ShoppingCart,
  ArrowDown,
  ArrowUp,
  CloudDrizzle,
} from 'react-feather';
import CountUp from 'react-countup';
import DataTable from 'react-data-table-component';

import TableColumn from './TableColumn';
import { useHistory } from 'react-router-dom';
import TableLoader from '../layout/loader/TableLoader';

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
import Breadcrumb from '../../layout/breadcrumb';

import SchoolDashboard from '../school/SchoolDashboard';
import Cities from '../cities/Cities';
import Countries from '../countries/Countries';
import Income from '../income/Income';
import { toast } from 'react-toastify';

const Dashboard = ({
  Dashboard: {
    cities,
    countries,
    schools,
    income,
    recentPurchase,
    graph,
    loading,
    error,
  },
  getDashboard,
  clearError,
}) => {
  let date = new Date();
  const [startDate, setStartDate] = useState(date);
  const [dailyButton, setDailyButton] = useState(true);
  const [monthlyButton, setMonthlyButton] = useState(false);
  const [weeklyButton, setWeeklyButton] = useState(false);
  const [yearlyButton, setYearlyButton] = useState(false);

  const [toggleCities, setToggleCities] = useState(false);
  const [toggleCountries, setToggleCountries] = useState(false);
  const [toggleIncome, setToggleIncome] = useState(false);
  const [toggleSchool, setToggleSchool] = useState(false);

  const history = useHistory();

  const Redirect = (redirect) => {
    history.push(redirect);
  };

  useEffect(() => {
    getDashboard();
    const date = {
      from: moment(startDate).format('YYYY-MM-DD'),
    };
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    // eslint-disable-next-line
  }, [startDate, error]);

  // const recentPurchase = [
  //   { regNo: 1, name: 'S2PS', package: 'Silver', price: 3200 },
  //   { regNo: 2, name: 'S3PS', package: 'Gold', price: 5600 },
  //   { regNo: 3, name: 'S1PS', package: 'Browinze', price: 2400 },
  //   { regNo: 4, name: 'S4PS', package: 'Platinium', price: 2200 },
  // ];

  console.log('graph:', graph !== null ? graph.purchases : []);
  const tableColumns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Package',
      selector: 'package_label',
      // width: '200px',
      sortable: true,
      center: true,
    },

    {
      name: 'Initial Amount',
      selector: 'initial_amount',
      sortable: true,
      center: true,
    },
  ];

  const onToggleSchool = () => {
    if (!toggleSchool) {
      setToggleSchool(true);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(false);
    } else {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(false);
    }
  };

  const onToggleCities = () => {
    if (!toggleCities) {
      setToggleSchool(false);
      setToggleCities(true);
      setToggleIncome(false);
      setToggleCountries(false);
    } else {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(false);
    }
  };

  const onToggleCountries = () => {
    if (!toggleCountries) {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(true);
    } else {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(false);
    }
  };

  const onToggleIncome = () => {
    if (!toggleIncome) {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(true);
      setToggleCountries(false);
    } else {
      setToggleSchool(false);
      setToggleCities(false);
      setToggleIncome(false);
      setToggleCountries(false);
    }
  };

  const dailydata = () => {
    if (!dailyButton) {
      setDailyButton(true);
      setWeeklyButton(false);
      setMonthlyButton(false);
      setYearlyButton(false);
    }
    date = moment(new Date()).format('YYYY-MM-DD');
    setStartDate(date);
  };

  const weeklyData = () => {
    if (!weeklyButton) {
      setWeeklyButton(true);
      setDailyButton(false);
      setMonthlyButton(false);
      setYearlyButton(false);
    }
    date = moment(date).subtract(7, 'days').format('YYYY-MM-DD');
    setStartDate(date);
  };

  const monthlyData = () => {
    if (!monthlyButton) {
      setMonthlyButton(true);
      setDailyButton(false);
      setWeeklyButton(false);
      setYearlyButton(false);
    }
    date = moment(date).subtract(1, 'months').format('YYYY-MM-DD');
    setStartDate(date);
  };

  const yearlyData = () => {
    if (!yearlyButton) {
      setYearlyButton(true);
      setWeeklyButton(false);
      setDailyButton(false);
      setMonthlyButton(false);
    }
    date = moment(date).subtract(1, 'years').format('YYYY-MM-DD');
    setStartDate(date);
  };
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Dashboard' />
      <Container fluid={true}>
        <Row>
          <Col sm='6' xl='3' lg='6'>
            <Card
              className='o-hidden'
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleSchool()}
            >
              <CardBody className='bg-primary b-r-4 card-body'>
                <div className='media static-top-widget'>
                  <div className='align-self-center text-center'>
                    <Square />
                  </div>
                  <div className='media-body' style={{ textAlign: 'left' }}>
                    <span className='m-0'>Schools</span>
                    {schools !== null ? (
                      <h4 className='mb-0 counter'>
                        <CountUp end={parseInt(schools)} />
                      </h4>
                    ) : (
                      <h4>{0}</h4>
                    )}
                    <Square className='icon-bg' />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm='6' xl='3' lg='6'>
            <Card
              className='o-hidden'
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleCities()}
            >
              <div className='bg-secondary b-r-4 card-body'>
                <div className='media static-top-widget'>
                  <div className='align-self-center text-center'>
                    <Circle />
                  </div>
                  <div className='media-body' style={{ textAlign: 'left' }}>
                    <span className='m-0'>Cities</span>
                    {cities !== null ? (
                      <h4 className='mb-0 counter'>
                        <CountUp end={parseInt(cities)} />
                      </h4>
                    ) : (
                      <h4>{0}</h4>
                    )}
                    <Circle className='icon-bg' />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm='6' xl='3' lg='6'>
            <Card
              className='o-hidden'
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleCountries()}
            >
              <CardBody className='bg-primary b-r-4'>
                <div className='media static-top-widget'>
                  <div className='align-self-center text-center'>
                    <Hexagon />
                  </div>
                  <div className='media-body' style={{ textAlign: 'left' }}>
                    <span className='m-0'>Countries</span>
                    {countries !== null ? (
                      <h4 className='mb-0 counter'>
                        <CountUp end={parseInt(countries)} />
                      </h4>
                    ) : (
                      <h4>{0}</h4>
                    )}
                    <Hexagon className='icon-bg' />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col
            sm='6'
            xl='3'
            lg='6'
            style={{ cursor: 'pointer' }}
            onClick={() =>
              Redirect(`${process.env.PUBLIC_URL}/virtualsoft/admin/income`)
            }
          >
            <Card className='o-hidden'>
              <CardBody className='bg-secondary b-r-4'>
                <div className='media static-top-widget'>
                  <div className='align-self-center text-center'>
                    <DollarSign />
                  </div>
                  <div className='media-body' style={{ textAlign: 'left' }}>
                    <span className='m-0'>Income</span>
                    {income !== null ? (
                      <h4 className='mb-0 counter'>
                        <CountUp end={parseInt(income)} />
                      </h4>
                    ) : (
                      <h4>{0}</h4>
                    )}
                    <DollarSign className='icon-bg' />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {toggleSchool && (
            <Col sm='12'>
              <SchoolDashboard />
            </Col>
          )}
          {toggleCities && (
            <Col sm='12'>
              <Cities />
            </Col>
          )}
          {toggleCountries && (
            <Col sm='12'>
              <Countries />
            </Col>
          )}

          <Col sm='12'>
            <TableColumn weekLeft={7} currentDay={3} days={20} month={30} />
          </Col>

          <Col sm='12'>
            <Charts />
          </Col>

          <Col sm='12'>
            <Card>
              <CardHeader>
                <h5>Recent Purchases</h5>
              </CardHeader>
              <CardBody>
                {recentPurchase !== null ? (
                  <DataTable
                    data={recentPurchase}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    progressPending={loading}
                    progressComponent={<TableLoader />}
                    noHeader={true}
                    pagination={true}
                  />
                ) : (
                  <TableLoader />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col sm='12' xl='6'>
            <BarChart />
          </Col>
          <Col sm='12' xl='6'>
            <Card>
              <CardHeader>
                <h5>Recent Purchases</h5>
              </CardHeader>
              <CardBody>
                {recentPurchase !== null ? (
                  <DataTable
                    data={recentPurchase}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    progressPending={loading}
                    progressComponent={<TableLoader />}
                    noHeader={true}
                    pagination={true}
                  />
                ) : (
                  <TableLoader />
                )}
              </CardBody>
            </Card>
          </Col>

          {/* //     ) : (
      //       <DataTable 
      //         data={filtered}
      //         columns={tableColumns}
      //         striped={true}
      //         center={true}
      //         persistTableHead
      //         noHeader={true}
      //         pagination={true}
      //       />
      //     )}
      //   </TransitionGroup>
      // ) : (
      //   <TableLoader />
      // )}*/}
        </Row>
      </Container>
    </Fragment>
  );
};
Dashboard.propTypes = {
  Dashboard: PropTypes.object.isRequired,
  getDashboard: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});

export default connect(mapStateToProps, { getDashboard, clearError })(
  Dashboard
);
