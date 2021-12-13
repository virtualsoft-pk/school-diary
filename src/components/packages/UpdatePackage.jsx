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

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePackage } from '../../actions/packageAction';

const UpdatePackage = ({
  modal,
  toggle,
  data,
  updatePackage,
  Auth: { userId },
}) => {
  //   const history = useHistory();

  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState(null);
  const [studentNumber, setStudentNumber] = useState('');
  const [id, setId] = useState('');

  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setId(data.id);
      setPackageName(data.label);
      setPrice(data.price);
      setDuration(data.duration);
      setStudentNumber(data.no_of_stds);
    }
    //eslint_disable_next_line
  }, []);

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

    setErrors(errors);

    return isValid;
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      // clear fileds

      const newPackage = {
        id,
        updated_by: userId,
        label: packageName,
        price,
        duration,
        no_of_stds: studentNumber,
      };

      updatePackage(newPackage);
      setId('');
      setPackageName('');
      setPrice('');
      setStudentNumber('');
      setDuration(null);
      toggle();
      // clearFile();
    }
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
        <Form onSubmit={onUpdate}>
          <ModalBody>
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
                  <div className='text-danger'>{errors.studentNumber}</div>
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
              </Col>{' '}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className='btn btn-sm float-right  btn-air-primary'
              color='primary'
              type='submit'
            >
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

UpdatePackage.propTypes = {
  Auth: PropTypes.object.isRequired,
  updatePackage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  updatePackage,
})(UpdatePackage);
