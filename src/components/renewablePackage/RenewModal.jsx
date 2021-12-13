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
import { viewSchool } from '../../actions/schoolAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { packageDetails } from '../../actions/packageAction';
import TableLoader from '../layout/loader/TableLoader';
import { renewPackage } from '../../actions/renewableRequestAction';
import SweetAlert from 'sweetalert2';

const RenewModal = ({
  School: { schoolDetail, schoolLoading },
  Package: { packageDetail, packageLoading },
  Auth: { userId },
  viewSchool,
  packageDetails,
  renewPackage,
  modal,
  toggle,
  data,
}) => {
  const [schoolData, setSchoolData] = useState(null);
  const [initialPrice, setInitialPrice] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  const [errors, setErrors] = useState('');
  const [alert, setalert] = useState(false);

  useEffect(() => {
    packageDetails(data.package_id);
    viewSchool(data.id);

    // eslint-disable-next-line
  }, []);

  const validate = () => {
    let errors = {};
    let isValid = true;

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

  const Displayalert = (name) => {
    setalert(true);
    if (parseInt(initialPrice) === parseInt(payAmount)) {
      SweetAlert.fire({
        title: 'Successfully Subscribed!',
        text: 'No Dues Left',
        icon: 'success',
      });
    } else {
      SweetAlert.fire({
        title: 'Successfully Subscribed!',
        text: `Dues Left: ${initialPrice - payAmount}`,
        icon: 'success',
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const subscriptionData = {
        school_id: data.school_id,
        new_package_id: data.package_id,
        initial_amount: parseInt(initialPrice),
        amount_paid: parseInt(payAmount),
        due_amount: parseInt(initialPrice) - parseInt(payAmount),
        created_by: userId,
      };
      renewPackage(subscriptionData);

      Displayalert('alertSuccess');

      toggle();
    }
  };
  console.log('schoolDetail', schoolDetail);
  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='md'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Renew Request
        </ModalHeader>
        <Form>
          <ModalBody>
            {!packageLoading || !schoolLoading ? (
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='school'>School</Label>
                    <Input
                      className='form-control digits'
                      name='school'
                      type='text'
                      value={data !== null ? data.school_name : ''}
                      disabled
                      placeholder='School name'
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='oldPackage'>Old Package</Label>
                    <Input
                      className='form-control digits'
                      name='oldPackage'
                      type='text'
                      value={
                        schoolDetail !== null ? schoolDetail.package_label : ''
                      }
                      disabled
                      placeholder='Old package'
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label htmlFor='newPackage'>Requested Package</Label>
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
                <Col sm={12} md={6}>
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
                <Col sm={12} md={6}>
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
              </Row>
            ) : (
              <TableLoader />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => onSubmit(e)}
              color='primary'
              className='btn btn-sm'
            >
              Pay
            </Button>
            <Button color='secondary' className='btn btn-sm' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

RenewModal.propTypes = {
  School: PropTypes.object.isRequired,
  Package: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  viewSchool: PropTypes.func.isRequired,
  packageDetails: PropTypes.func.isRequired,
  renewPackage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
  Package: state.Package,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  viewSchool,
  packageDetails,
  renewPackage,
})(RenewModal);
