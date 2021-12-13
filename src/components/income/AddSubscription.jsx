/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useRef, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
} from 'reactstrap';
import { titleCase } from 'title-case';
import { loadSchools } from '../../actions/schoolAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { packageDetails } from '../../actions/packageAction';
import TableLoader from '../layout/loader/TableLoader';

import { addSubscription } from '../../actions/incomeAction';

const AddSubscription = ({
  School: { schools },
  Package: { packageDetail, packageLoading },
  Auth: { userId },
  loadSchools,
  packageDetails,
  addSubscription,
  modal,
  toggle,
  data,
}) => {
  const [schoolData, setSchoolData] = useState(null);
  const [initialPrice, setInitialPrice] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  useEffect(() => {
    loadSchools();
    packageDetails(data.package_id);

    // eslint-disable-next-line
  }, []);

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (schoolData === null) {
      isValid = false;
      errors['schoolData'] = 'Please select school.';
    }

    if (initialPrice === '' || parseInt(initialPrice) === 0) {
      isValid = false;
      errors['initialPrice'] = 'Please enter initial price.';
    }
    if (
      parseInt(initialPrice) > 0 &&
      parseInt(initialPrice) > parseInt(packageDetail.price)
    ) {
      isValid = false;
      errors['initialPrice'] =
        "Initial price can't be greater than package price.";
    }

    if (payAmount === '' || parseInt(payAmount) === 0) {
      isValid = false;
      errors['payAmount'] = 'Please enter pay-amount.';
    }
    if (
      parseInt(payAmount) > 0 &&
      parseInt(payAmount) > parseInt(initialPrice)
    ) {
      isValid = false;
      errors['payAmount'] = "Pay-amount can't be greater than initial price.";
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const subscriptionData = {
        school_id: schoolData[0].id,
        new_package_id: data.package_id,
        initial_amount: parseInt(initialPrice),
        amount_paid: parseInt(payAmount),
        due_amount: parseInt(initialPrice) - parseInt(payAmount),
        created_by: userId,
      };
      console.log('subscriptionData', subscriptionData);
      addSubscription(subscriptionData);

      toggle();
    }
  };

  const onChangeSchool = (e) => {
    const schoolData = schools.filter((school) => {
      return school.id.indexOf(e.target.value) !== -1;
    });
    setSchoolData(schoolData);
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Subscription
        </ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            {!packageLoading ? (
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='schools'>Select School</Label>
                    <Input
                      className='form-control digits'
                      type='select'
                      name='schools'
                      value={schools && schoolData !== null ? schools.name : ''}
                      onChange={(e) => onChangeSchool(e)}
                    >
                      <option disabled value=''>
                        Select School
                      </option>

                      {schools !== null &&
                        schools.map((school, index) => (
                          <option key={index} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                    </Input>

                    <div className='text-danger'>{errors.schoolData}</div>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='currentPackage'>Current Package</Label>
                    <Input
                      className='form-control digits'
                      name='currentPackage'
                      type='text'
                      value={
                        schoolData !== null ? schoolData[0].package_label : ''
                      }
                      disabled
                      placeholder='Current package'
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='newPackage'>New Package</Label>
                    <Input
                      className='form-control digits'
                      name='newPackage'
                      type='text'
                      value={packageDetail !== null ? packageDetail.label : ''}
                      disabled
                      placeholder='New package'
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='amount'>Price</Label>
                    <Input
                      className='form-control digits'
                      name='amount'
                      type='number'
                      value={packageDetail !== null ? packageDetail.price : ''}
                      disabled
                      placeholder='Package price'
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label htmlFor='initialPrice'>Initial Price</Label>
                    <Input
                      name='initialPrice'
                      type='number'
                      className='form-control digits'
                      placeholder='Enter initial price'
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(e.target.value)}
                      min={0}
                    ></Input>
                    <div className='text-danger'>{errors.initialPrice}</div>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label htmlFor='payAmount'>Pay Amount</Label>
                    <Input
                      name='payAmount'
                      type='number'
                      className='form-control digits'
                      placeholder='Enter pay amount'
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      min={0}
                    ></Input>
                    <div className='text-danger'>{errors.payAmount}</div>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label htmlFor='dues'>Dues</Label>
                    <Input
                      name='dues'
                      type='number'
                      className='form-control digits'
                      placeholder='Dues remaining'
                      value={initialPrice - payAmount}
                      disabled
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            ) : (
              <TableLoader />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' className='btn btn-sm' type='submit'>
              Submit
            </Button>{' '}
            <Button color='secondary' className='btn btn-sm' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

AddSubscription.propTypes = {
  School: PropTypes.object.isRequired,
  Package: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  loadSchools: PropTypes.func.isRequired,
  packageDetails: PropTypes.func.isRequired,
  addSubscription: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
  Package: state.Package,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  loadSchools,
  packageDetails,
  addSubscription,
})(AddSubscription);
