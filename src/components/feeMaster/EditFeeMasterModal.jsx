/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useRef, Fragment, useEffect, useState } from 'react';

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
  Container,
  Card,
  CardBody,
} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const EditFeeMasterModal = ({ modal, toggle, data }) => {
  const [amount, setAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);
  const [fineType, setFineType] = useState('');

  const [selectedFeeGroup, setSelectedFeeGroup] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState([]);
  const [dueDate, setDueDate] = useState(moment(new Date()));

  useEffect(() => {
    if (data) {
      setAmount(data.amount);
      setPercentage(data.percentage);
      setFineAmount(data.fineAmount);
      setFineType(data.fineType);
      setSelectedFeeGroup(data.selectedFeeGroup);
      setSelectedFeeType(data.selectedFeeType);
    }

    // eslint-disable-next-line
  }, []);

  const onFeeGroupChange = (feeGroup) => {
    setSelectedFeeGroup(feeGroup);
  };
  const onFeeTypeChange = (feeType) => {
    setSelectedFeeType(feeType);
  };
  const [errors, setErrors] = useState('');

  const classes = [
    {
      feeGroup: 'A1',
      feeType: 'Annually',
    },
    {
      feeGroup: 'A2',
      feeType: 'Monthly',
    },
    {
      feeGroup: 'A3',
      feeType: 'Monthly',
    },
  ];

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (amount === '' || amount === 0) {
      isValid = false;
      errors['amount'] = 'Please enter amount.';
    }
    if (percentage === '' || percentage === 0) {
      isValid = false;
      errors['percentage'] = 'Please enter percentage.';
    }
    if (fineAmount === '') {
      isValid = false;
      errors['fineAmount'] = 'Please enter fine amount.';
    }
    if (fineType === '') {
      isValid = false;
      errors['fineType'] = 'Please select fine type.';
    }
    if (selectedFeeGroup.length === 0) {
      isValid = false;
      errors['selectedFeeGroup'] = 'Please enter fee group.';
    }

    if (selectedFeeType.length === 0) {
      isValid = false;
      errors['selectedFeeType'] = 'Please enter fee type.';
    }

    if (dueDate !== '' && dueDate !== undefined && dueDate !== null) {
      if (typeof dueDate === 'string') {
        isValid = false;
        errors['dueDate'] = 'Please enter a valid date.';
      }
    }

    setErrors(errors);

    return isValid;
  };

  const onSetPercentage = (value) => {
    if (fineType === 'percentage') {
      setFineAmount(parseInt(amount * (value / 100)));
    }
    setPercentage(value);
  };

  let inputProps = {
    placeholder: 'Due Date',
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
    }
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='md'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Update Fee Master
        </ModalHeader>
        <Form onSubmit={onUpdate}>
          <ModalBody>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='feeGroup'>Fee Group</Label>
                  <Typeahead
                    // className='mt-2'
                    id='multiple-typeahead'
                    defaultInputValue={selectedFeeGroup}
                    clearButton
                    labelKey='feeGroup'
                    options={classes}
                    placeholder='Select fee group....'
                    onChange={(data) => onFeeGroupChange(data)}
                  />
                  <div className='text-danger'>{errors.selectedFeeGroup}</div>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='feeType'>Fee Type</Label>
                  <Typeahead
                    id='multiple-typeahead'
                    defaultInputValue={selectedFeeType}
                    clearButton
                    labelKey='feeType'
                    options={classes}
                    placeholder='Select fee type....'
                    onChange={(data) => onFeeTypeChange(data)}
                  />
                  <div className='text-danger'>{errors.selectedFeeType}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label className='form-label'>Due Date</Label>
                  <Datetime
                    timeFormat={false}
                    dateFormat='YYYY-MM-DD'
                    inputProps={inputProps}
                    value={dueDate ? dueDate : 'YYYY-MM-DD'}
                    onChange={(date) => setDueDate(date)}
                  />
                  <div className='text-danger'>{errors.dueDate}</div>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='amount'>Amount</Label>
                  <Input
                    name='amount'
                    type='number'
                    className='form-control digits'
                    placeholder='Enter amount'
                    value={amount && amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.amount}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={12} className='m-0'>
                <Row>
                  <Col sm={12} md={12}>
                    <Label htmlFor='fineType'>Fine Type</Label>
                  </Col>
                </Row>
                <FormGroup>
                  <Row>
                    <Col sm={12} sm={4}>
                      <Label className='d-block' for='none'>
                        <Input
                          className='radio_animated'
                          id='none'
                          value='none'
                          type='radio'
                          onChange={(e) => setFineType(e.target.value)}
                          name='fineType'
                          defaultChecked={fineType === 'none'}
                        />
                        {'None'}
                      </Label>
                    </Col>
                    <Col sm={12} sm={4}>
                      <Label for='percentage'>
                        <Input
                          className='radio_animated'
                          id='percentage'
                          value='percentage'
                          type='radio'
                          onChange={(e) => setFineType(e.target.value)}
                          name='fineType'
                          defaultChecked={fineType === 'percentage'}
                        />
                        {'Percentage'}
                      </Label>
                    </Col>
                    <Col sm={12} sm={4}>
                      <Label className='d-block' for='fixAmount'>
                        <Input
                          className='radio_animated'
                          id='fixAmount'
                          value='fix amount'
                          onChange={(e) => setFineType(e.target.value)}
                          type='radio'
                          name='fineType'
                          defaultChecked={fineType === 'fix amount'}
                        />
                        {'Fix Amount'}
                      </Label>
                    </Col>
                  </Row>
                  <div className='text-danger'>{errors.fineType}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='percentage'>Percentage</Label>
                  <Input
                    name='percentage'
                    type='number'
                    className='form-control digits'
                    placeholder='Enter percentage'
                    value={percentage && percentage}
                    onChange={(e) => onSetPercentage(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.percentage}</div>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='fineAmount'>Fine Amount</Label>
                  <Input
                    name='fineAmount'
                    type='number'
                    className='form-control digits'
                    placeholder='Enter fine amount'
                    value={fineAmount && fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.fineAmount}</div>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className='btn btn-sm float-right  btn-air-primary'
              color='primary'
              type='submit'
            >
              Update
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

export default EditFeeMasterModal;
