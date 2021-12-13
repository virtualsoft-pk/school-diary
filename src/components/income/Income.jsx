import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Plus } from 'react-feather';
import Breadcrumb from '../../layout/breadcrumb';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import AddSubscription from './AddSubscription';
import TableLoader from '../layout/loader/TableLoader';

import {
  loadIncomes,
  clearMessage,
  clearError,
} from '../../actions/incomeAction';

const Income = ({
  Income: { errors, message, incomes, totals },
  loadIncomes,
  clearMessage,
  clearError,
}) => {
  const history = useHistory();
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState(null);
  const [packageId, setPackageId] = useState(null);

  const detailsRedirect = (redirect) => {
    history.push({
      pathname: redirect,
      state: {
        id: packageId,
      },
    });
  };
  useEffect(() => {
    loadIncomes();

    if (packageId !== null) {
      detailsRedirect(`/virtualsoft/admin/income/details`);
    }

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
  }, [packageId, errors, message]);

  const addToggle = (row) => {
    setAddModal(!addModal);
    setData(row);
  };

  const viewToggle = (id) => {
    setPackageId(id);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Income' />
      {addModal && (
        <AddSubscription modal={addModal} toggle={addToggle} data={data} />
      )}

      <Container fluid={true}>
        <Card>
          <CardBody>
            <section id='pricing' className='pricing'>
              <div className='container-fluid mt-1' data-aos='fade-up'>
                {incomes !== null ? (
                  <>
                    <Row className='justify-content-center'>
                      {incomes.map((income, index) => (
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
                                <h3 id='hover01'>{income.package} Package</h3>
                                <h5>
                                  {income.income !== null ? income.income : 0}
                                </h5>
                                <ul>
                                  <div className='bg-details'>
                                    <div
                                      className='bg-sub'
                                      onClick={() => addToggle(income)}
                                    >
                                      Subscription
                                      <span>
                                        <Plus />
                                      </span>
                                    </div>
                                  </div>
                                </ul>
                                <div className='btn-wrap'>
                                  <Button
                                    color='primary'
                                    className='btn btn-sm'
                                    onClick={() =>
                                      viewToggle(income.package_id)
                                    }
                                  >
                                    Details
                                  </Button>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        </Fragment>
                      ))}
                    </Row>
                    <Row className='justify-content-center'>
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
                            <h3 id='hover01'>Total Packages</h3>
                            <h5>{totals !== null ? totals : 0}</h5>

                            <div className='btn-wrap'></div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <TableLoader />
                )}
              </div>
            </section>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
Income.propTypes = {
  Income: PropTypes.object.isRequired,
  loadIncomes: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Income: state.Income,
});

// deleteBlog,
export default connect(mapStateToProps, {
  loadIncomes,
  clearMessage,
  clearError,
})(Income);
