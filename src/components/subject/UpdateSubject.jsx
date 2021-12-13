import React, { useEffect, useState } from 'react';
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
// import { titleCase } from 'title-case';

const UpdateSubject = ({ data, modal, toggle }) => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectType, setSubjectType] = useState('');

  const [errors, setErrors] = useState('');
  //   const [id, setId] = useState(null);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (subjectName === '') {
      isValid = false;
      errors['subjectName'] = 'Please enter subject name.';
    }
    if (subjectCode === '') {
      isValid = false;
      errors['subjectCode'] = 'Please enter subject code.';
    }
    if (subjectType === '') {
      isValid = false;
      errors['subjectType'] = 'Please enter subject type.';
    }
    setErrors(errors);

    return isValid;
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      // Clear fields
      setSubjectName('');
      setSubjectCode('');
      setSubjectType('');
      toggle();
    }
  };
  const onChangeSubjectType = (e) => {
    setSubjectType(e.target.value);
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='sm'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Update Subject
        </ModalHeader>
        <ModalBody>
          <Row>
            {' '}
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='subject'>Subject Name</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='subjectName'
                  value={subjectName ? subjectName : ''}
                  placeholder='Enter subject name'
                  onChange={(e) => setSubjectName(e.target.value)}
                />
                <div className='text-danger'>{errors.subjectName}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={12}>
              <FormGroup>
                <Label htmlFor='subjectCode'>Subject Code</Label>
                <Input
                  className='form-control'
                  type='text'
                  name='subjectCode'
                  value={subjectCode ? subjectCode : ''}
                  placeholder='Enter subject code'
                  onChange={(e) => setSubjectCode(e.target.value)}
                />
                <div className='text-danger'>{errors.subjectCode}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={12}>
              <FormGroup className='form-row'>
                <label className='col-form-label text-right'>
                  Subject Type:
                </label>
                <div className='col-sm-12'>
                  <div className='input-group'>
                    <Input
                      className='form-control digits'
                      style={{ width: '100%' }}
                      type='select'
                      name='subjectType'
                      value={subjectType ? subjectType : ''}
                      onChange={onChangeSubjectType}
                    >
                      <option disabled value=''>
                        Select Subject Type
                      </option>
                      <option key={1} value={'theory'}>
                        Theory
                      </option>
                      <option key={2} value={'practicle'}>
                        Practicle
                      </option>
                    </Input>
                    <div className='text-danger'>{errors.subjectType}</div>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => onUpdate(e)}
            color='primary'
            className='btn btn-sm'
          >
            Update
          </Button>
          <Button color='secondary' className='btn btn-sm' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateSubject;
