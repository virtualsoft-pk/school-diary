import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import ChartistChart from 'react-chartist';
import RenewModal from './RenewModal';
import {
  smallchart1data,
  smallchart1option,
  smallchart2data,
  smallchart2option,
} from '../dashboard/chartData/ChartistChartsData';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RenewableFilter from './RenewableFilter';
import {
  loadRenewableRequests,
  clearMessage,
  clearError,
} from '../../actions/renewableRequestAction';
import moment from 'moment';
import TableLoader from '../layout/loader/TableLoader';
import { TransitionGroup } from 'react-transition-group';
import { titleCase } from 'title-case';
import { toast } from 'react-toastify';

const RenewableRequest = ({
  RenewableRequest: {
    renewableRequests,
    counterData,
    renewableRequestFiltered,
    renewableRequestLoading,
    errors,
    message,
  },
  loadRenewableRequests,
  clearMessage,
  clearError,
}) => {
  const [renewModal, setRenewModal] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadRenewableRequests();
    if (errors !== null) {
      setTimeout(() => {
        toast.error(errors);
      }, 200);
      clearError();
    }
    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }
    //eslint-disable-next-line
  }, [errors, message]);

  const tableColumns = [
    {
      name: 'School Id.',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'School Name',
      selector: 'school_name',
      sortable: true,
      center: true,
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      center: true,
    },
    {
      name: 'State',
      selector: 'state',
      sortable: true,
      center: true,
    },

    {
      name: 'City',
      selector: 'city',
      sortable: true,
      center: true,
    },
    {
      name: 'Previous Package',
      selector: 'current_package',
      sortable: true,
      center: true,
    },
    {
      name: 'New Package Requested',
      selector: 'requested_package',
      sortable: true,
      center: true,
    },
    {
      name: 'Request Date',
      sortable: true,
      center: true,
      cell: (row) => (
        <span>{moment(row.request_date).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      name: 'Action',
      center: true,
      width: '135px',
      cell: (row) => (
        <div>
          <button
            className='btn update-button'
            onClick={() => renewToggle(row)}
          >
            renew
          </button>
        </div>
      ),
    },
  ];
  const renewToggle = (row) => {
    setRenewModal(!renewModal);
    setData(row);
  };

  return (
    <Fragment>
      {renewModal && (
        <RenewModal modal={renewModal} toggle={renewToggle} data={data} />
      )}
      <Breadcrumb parent={null} title='Renewable Request' />
      {renewableRequests !== null && !renewableRequestLoading ? (
        <Container fluid={true}>
          <Row className='second-chart-list third-news-update'>
            <Col sm='12' className='chart_data_left box-col-12 mt-3'>
              <Card>
                <CardBody className='p-0'>
                  <Row className='m-0 chart-main justify-content-between'>
                    {counterData.map((counter, index) => (
                      <Fragment key={index}>
                        <Col xl='4' md='6' sm='6' className='p-0 box-col-6'>
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
                                {counter.count !== null ? (
                                  <h4>{counter.count} </h4>
                                ) : (
                                  <h4>{0}</h4>
                                )}

                                <span>
                                  {titleCase(counter.package)} Package Request
                                </span>
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

            <Col sm={12} md={12}>
              <Card>
                <CardBody>
                  <Fragment>
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
                        <RenewableFilter />
                      </Col>
                    </Row>
                    <TransitionGroup>
                      {renewableRequestFiltered !== null ? (
                        <DataTable
                          data={renewableRequestFiltered}
                          columns={tableColumns}
                          striped={true}
                          center={true}
                          pagination={true}
                          persistTableHead
                          noHeader={true}
                        />
                      ) : (
                        <DataTable
                          data={renewableRequests}
                          columns={tableColumns}
                          striped={true}
                          center={true}
                          pagination={true}
                          persistTableHead
                          noHeader={true}
                        />
                      )}
                    </TransitionGroup>
                  </Fragment>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <TableLoader />
      )}
    </Fragment>
  );
};

RenewableRequest.propTypes = {
  RenewableRequest: PropTypes.object.isRequired,
  loadRenewableRequests: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  RenewableRequest: state.RenewableRequest,
});

// deleteBlog,
export default connect(mapStateToProps, {
  loadRenewableRequests,
  clearMessage,
  clearError,
})(RenewableRequest);
