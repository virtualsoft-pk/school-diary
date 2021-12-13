import React, { useRef, Fragment, useEffect, useState } from 'react';
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

import { addFeeType } from '../../actions/feeTypeAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddFeeType = ({ Auth: { userId, user }, addFeeType }) => {
  const [name, setName] = useState('');

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (name === '') {
      isValid = false;
      errors['name'] = 'Please enter school name.';
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (user) {
        const newFeeGroup = {
          label: name,
          school_id: user.school_id,
          created_by: userId,
        };

        addFeeType(newFeeGroup);

        // Clear fields
        setName('');
      }
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Form onSubmit={onSubmit}>
            <Col sm={6} md={6}>
              <FormGroup>
                <Label htmlFor='name'>Name</Label>
                <Input
                  name='name'
                  type='text'
                  max='100'
                  className='form-control digits'
                  placeholder='Enter school name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <div className='text-danger'>{errors.name}</div>
              </FormGroup>
            </Col>
            <Col sm={6} md={6}>
              <Button
                className='btn btn-sm float-right'
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
AddFeeType.propTypes = {
  Auth: PropTypes.object.isRequired,
  addFeeType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  addFeeType,
})(AddFeeType);
