/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateFeeType } from '../../actions/feeTypeAction';

const EditFeeTypeModal = ({
  data,
  modal,
  toggle,
  updateFeeType,
  Auth: { user, userId },
}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.label);
      setId(data.id);
    }

    // eslint-disable-next-line
  }, []);

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

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      if (user) {
        const newFeeGroup = {
          label: name,
          id,
          updated_by: userId,
        };

        updateFeeType(newFeeGroup);

        // Clear fields
        setName('');
        setId('');
        toggle();
      }
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
          Update Fee Type
        </ModalHeader>
        <Form onSubmit={onUpdate}>
          <ModalBody>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    name='name'
                    type='text'
                    max='100'
                    className='form-control digits'
                    placeholder='Enter school name'
                    value={name || name}
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.name}</div>
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
EditFeeTypeModal.propTypes = {
  Auth: PropTypes.object.isRequired,
  updateFeeType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  updateFeeType,
})(EditFeeTypeModal);
