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
import { addFeeGroup } from '../../actions/feeGroupAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddFeeGroup = ({ Auth: { userId, user }, addFeeGroup }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (name === '') {
      isValid = false;
      errors['name'] = 'Please enter school name.';
    }

    if (description === '') {
      isValid = false;
      errors['description'] = 'Please enter description.';
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
          description: description,
          school_id: user.school_id,
          created_by: userId,
        };
        addFeeGroup(newFeeGroup);

        // Clear fields
        setName('');
        setDescription('');
      }
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col sm={12} md={12}>
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
              <Col sm={12} md={12}>
                <FormGroup>
                  <Label htmlFor='description'>Description</Label>
                  <Input
                    name='description'
                    type='textarea'
                    max='100'
                    className='form-control digits'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.description}</div>
                </FormGroup>
              </Col>
            </Row>

            <Button
              className='btn btn-sm float-right'
              color='primary'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

AddFeeGroup.propTypes = {
  Auth: PropTypes.object.isRequired,
  addFeeGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  addFeeGroup,
})(AddFeeGroup);
