import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { titleCase } from 'title-case';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { addSalesPersons } from '../../actions/salesPersonsAction';
import TableLoader from '../layout/loader/TableLoader';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const AddSalePerson = ({
  Auth: { userId },
  addSalesPersons,
  modal,
  toggle,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [address, setAddress] = useState('');
  const [joinDate, setJoinDate] = useState(moment(new Date()));
  const [commission, setCommission] = useState(0);

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (name === '') {
      isValid = false;
      errors['name'] = 'Please enter name.';
    }
    if (name !== '') {
      if (name.length < 3) {
        isValid = false;
        errors['name'] =
          'The name field must be at least 3 characters in length.';
      }
    }

    if (email === '') {
      isValid = false;
      errors['email'] = 'Please enter your email Address.';
    }

    if (email !== '') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors['email'] = 'Please enter a valid email address.';
      }
    }

    if (phoneNumber === '') {
      isValid = false;
      errors['phoneNumber'] = 'Please enter your phone number.';
    }
    if (phoneNumber !== '') {
      let pattern = new RegExp(/^[0-9]{1,15}$/i);
      if (!pattern.test(phoneNumber)) {
        isValid = false;
        errors['phoneNumber'] = 'Please enter a valid phone number.';
      }
    }
    if (joinDate === '' || joinDate === undefined || joinDate === null) {
      isValid = false;
      errors['joinDate'] = 'Please enter joining date.';
    }
    if (joinDate !== '' && joinDate !== undefined && joinDate !== null) {
      if (typeof joinDate === 'string') {
        isValid = false;
        errors['joinDate'] = 'Please enter a valid date.';
      }
    }

    if (address === '') {
      isValid = false;
      errors['address'] = 'Please enter your address.';
    }

    if (commission <= 0) {
      isValid = false;
      errors['commission'] = 'Please enter commission.';
    }

    if (CNIC === '') {
      isValid = false;
      errors['CNIC'] = 'Please enter your CNIC.';
    }
    if (CNIC !== '') {
      let pattern = new RegExp(/^[0-9]{13}$/i);
      if (!pattern.test(CNIC)) {
        isValid = false;
        errors['CNIC'] =
          'Please enter a valid CNIC number, e.g (12101********)';
      }
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('doneee');
      const data = {
        name: name,
        email: email,
        phone: phoneNumber,
        cnic: CNIC,
        address: address,
        doj: joinDate,
        commission: commission,
        created_by: userId,
      };
      addSalesPersons(data);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setCNIC('');
      setAddress('');
      setJoinDate('');
      setCommission('');

      toggle();
    }
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );

  let inputPropsJoing = {
    placeholder: 'Joining datte',
  };
  console.log('joinDate::', joinDate);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Add Sales Person
        </ModalHeader>
        <ModalBody>
          {userId !== null ? (
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='name'>User Name</Label>
                  <Input
                    className='form-control'
                    type='text'
                    name='name'
                    value={name ? name : ''}
                    placeholder='User Name'
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className='text-danger'>{errors.name}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    className='form-control'
                    type='email'
                    name='email'
                    value={email ? email : ''}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className='text-danger'>{errors.email}</div>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='phoneNumber'>Phone Number</Label>
                  <PhoneInput
                    enableSearch
                    disableSearchIcon
                    inputStyle={{ width: '100%' }}
                    searchStyle={{ margin: '0', width: '97%', height: '30px' }}
                    country={'ae'}
                    value={phoneNumber ? phoneNumber : ''}
                    onChange={(e) => setPhoneNumber(e)}
                    placeholder='Phone Number'
                  />
                  <div className='text-danger'>{errors.phoneNumber}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='CNIC'>CNIC</Label>
                  <Input
                    className='form-control'
                    type='text'
                    name='CNIC'
                    value={CNIC ? CNIC : ''}
                    placeholder='CNIC e.g (12101********)'
                    onChange={(e) => setCNIC(e.target.value)}
                    required
                    maxLength='13'
                  />
                  <div className='text-danger'>{errors.CNIC}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='commission'>Commission %</Label>
                  <Input
                    className='form-control'
                    type='number'
                    name='Enter commission %'
                    value={commission ? commission : ''}
                    placeholder='User commission'
                    onChange={(e) => setCommission(e.target.value)}
                    required
                    min='0'
                  />
                  <div className='text-danger'>{errors.commission}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label className='form-label'>Joining Date</Label>
                  <Datetime
                    timeFormat={false}
                    dateFormat='YYYY-MM-DD'
                    inputProps={inputPropsJoing}
                    value={joinDate ? joinDate : 'YYYY-MM-DD'}
                    onChange={(date) => setJoinDate(date)}
                  />
                  <div className='text-danger'>{errors.joinDate}</div>
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <Label htmlFor='address'>Address</Label>
                  <Input
                    name='address'
                    type='textarea'
                    max='100'
                    className='form-control digits'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Input>
                  <div className='text-danger'>{errors.address}</div>
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
            Submit
          </Button>
          <Button color='secondary' className='btn btn-sm' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddSalePerson.propTypes = {
  Auth: PropTypes.object.isRequired,
  addSalesPersons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, { addSalesPersons })(AddSalePerson);
