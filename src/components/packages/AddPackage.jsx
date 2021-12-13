import React, { Fragment, useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Label,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';
// import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useHistory } from 'react-router';
// import { titleCase } from 'title-case';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPackage } from '../../actions/packageAction';

const AddPackage = ({ addPackage }) => {
  const history = useHistory();

  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState(null);
  const [studentNumber, setStudentNumber] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [errors, setErrors] = useState('');

  // useEffect(() => {
  //   if (error !== null) {
  //     setTimeout(() => {
  //       toast.error(error);
  //     }, 200);
  //     clearError();
  //   }
  //   if (message !== null) {
  //     setTimeout(() => {
  //       toast.success(message);
  //     }, 200);
  //     clearMessage();
  //   }

  //   // eslint-disable-next-line
  // }, [message, error]);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (packageName === '') {
      isValid = false;
      errors['packageName'] = 'Please enter package name.';
    }
    if (price === '') {
      isValid = false;
      errors['price'] = 'Please enter price.';
    }
    if (duration === '') {
      isValid = false;
      errors['duration'] = 'Please enter duration.';
    }

    if (studentNumber === '') {
      isValid = false;
      errors['studentNumber'] = 'Please enter No. of student.';
    }

    // if (modelYear === '') {
    //   isValid = false;
    //   errors['modelYear'] = 'Please select model year.';
    // }
    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // clear fileds

      const newPackage = {
        label: packageName,
        price,
        duration,
        no_of_stds: studentNumber,
      };

      addPackage(newPackage);

      setPackageName('');
      setPrice('');
      setStudentNumber('');
      setDuration(null);
      // clearFile();
    }
  };

  console.log(duration);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='packageName'>Package Name</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='packageName'
                          value={packageName ? packageName : ''}
                          placeholder='Package name'
                          onChange={(e) => setPackageName(e.target.value)}
                        />
                        <div className='text-danger'>{errors.packageName}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='price'>Price</Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='price'
                          value={price ? price : ''}
                          placeholder='Price'
                          onChange={(e) => setPrice(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.price}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='studentNumber'>No. of Student</Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='studentNumber'
                          value={studentNumber ? studentNumber : ''}
                          placeholder='No. Of Student...'
                          onChange={(e) => setStudentNumber(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.studentNumber}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='duration'>Duration:</Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='duration'
                          value={duration ? duration : ''}
                          placeholder='No Of Days...'
                          onChange={(e) => setDuration(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.duration}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    type='submit'
                    className='btn btn-sm float-right'
                    color='primary'
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

AddPackage.propTypes = {
  // Product: PropTypes.object.isRequired,
  addPackage: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   Product: state.Product,
// });

export default connect(null, {
  addPackage,
})(AddPackage);
