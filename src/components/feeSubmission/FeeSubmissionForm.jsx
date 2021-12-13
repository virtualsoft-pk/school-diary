import React, { Fragment, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
const FeeSubmissionForm = () => {
  const [regNumber, setRegNumber] = useState(1);
  const [studentName, setStudentName] = useState('Ali');
  const [session, setSession] = useState('2016-2020');
  const [interval, setInterval] = useState('yearly');
  const [studentClass, setStudentClass] = useState('12');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState('01-01-2019');
  const [fine, setFine] = useState('1000');
  const [feeAmount, setFeeAmount] = useState('');
  const [dues, setDues] = useState('1000');
  const [discount, setDiscount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const [errors, setErrors] = useState('');

  const history = useHistory();

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (fine === '') {
      isValid = false;
      errors['fine'] = 'Please enter first name.';
    }

    if (feeAmount === '') {
      isValid = false;
      errors['feeAmount'] = 'Please enter last name.';
    }

    if (dues === '') {
      isValid = false;
      errors['dues'] = 'Please enter last name.';
    }

    if (discount === '') {
      isValid = false;
      errors['discount'] = 'Please enter last name.';
    }

    if (totalAmount === '') {
      isValid = false;
      errors['totalAmount'] = 'Please enter last name.';
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  return (
    <Fragment>
      <Breadcrumb
        parent='Fee'
        parentLink='/fee/fee-list'
        title='Fee Submission'
      />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='regNumber'>Registeration #</Label>
                        <Input
                          name='regNumber'
                          type='number'
                          className='form-control digits'
                          placeholder='Enter registration number'
                          value={regNumber}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='studentName'>Student Name</Label>
                        <Input
                          name='studentName'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter first name'
                          value={studentName}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='session'>Session</Label>
                        <Input
                          name='session'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter last name'
                          value={session}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='interval'>Interval</Label>
                        <Input
                          name='interval'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter interval'
                          value={interval}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='studentClass'>Class</Label>
                        <Input
                          name='studentClass'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter studentClass'
                          value={studentClass}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='section'>Section</Label>
                        <Input
                          name='section'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter section'
                          value={section}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='date'>date</Label>
                        <Input
                          name='date'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter date'
                          value={date}
                          disabled
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='fine'>Fine</Label>
                        <Input
                          name='fine'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter fine'
                          value={fine}
                          onChange={(e) => setFine(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.fine}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='feeAmount'>Fee Amount</Label>
                        <Input
                          name='feeAmount'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter fee amount'
                          value={feeAmount}
                          onChange={(e) => setFeeAmount(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.feeAmount}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='dues'>Dues</Label>
                        <Input
                          name='dues'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter dues'
                          value={dues}
                          onChange={(e) => setDues(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.dues}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='discount'>Discount</Label>
                        <Input
                          name='discount'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter discount'
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.discount}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='totalAmount'>Total Amount</Label>
                        <Input
                          name='totalAmount'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter total amount'
                          value={totalAmount}
                          onChange={(e) => setTotalAmount(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.totalAmount}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Button
                    className='btn btn-sm float-right'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default FeeSubmissionForm;
