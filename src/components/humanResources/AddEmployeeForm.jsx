import React, {
  useCallback,
  useRef,
  Fragment,
  useEffect,
  useState,
} from 'react';
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
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { DateOfBirth, PhoneNumber, EmailAddress } from '../../constant';
import moment from 'moment';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Dropzone from 'react-dropzone';

const AddEmployeeForm = () => {
  const [regNumber, setRegNumber] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [religion, setReligion] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [email, setEmail] = useState('');
  const [joinDate, setJoinDate] = useState(moment(new Date()));
  const [salary, setSalary] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [selectedExcelFile, setSelectedExcelFile] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  const [errors, setErrors] = useState('');

  const history = useHistory();

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (regNumber === '' || regNumber === 0) {
      isValid = false;
      errors['regNumber'] = 'Please enter registration number.';
    }

    if (firstName === '') {
      isValid = false;
      errors['firstName'] = 'Please enter first name.';
    }

    if (lastName === '') {
      isValid = false;
      errors['lastName'] = 'Please enter last name.';
    }

    if (gender === '') {
      isValid = false;
      errors['gender'] = 'Please select gender.';
    }
    if (role === '') {
      isValid = false;
      errors['role'] = 'Please select role.';
    }
    if (
      dateOfBirth !== '' ||
      dateOfBirth !== undefined ||
      dateOfBirth !== null
    ) {
      isValid = false;
      errors['dateOfBirth'] = 'Please enter date of birth.';
    }
    if (
      dateOfBirth !== '' &&
      dateOfBirth !== undefined &&
      dateOfBirth !== null
    ) {
      if (typeof dateOfBirth === 'string') {
        isValid = false;
        errors['dateOfBirth'] = 'Please enter a valid date.';
      }
    }

    if (
      joinDate !== '' &&
      joinDate !== undefined &&
      joinDate !== null
    ) {
      if (typeof joinDate === 'string') {
        isValid = false;
        errors['joinDate'] = 'Please enter a valid date.';
      }
    }

    if (phoneNumber === '') {
      isValid = false;
      errors['phoneNumber'] = 'Please enter your phone number.';
    }
    if (phoneNumber !== '') {
      var pattern = new RegExp(/^[0-9]{1,15}$/i);
      if (!pattern.test(phoneNumber)) {
        isValid = false;
        errors['phoneNumber'] = 'Please enter a valid phone number.';
      }
    }

    if (religion === '') {
      isValid = false;
      errors['religion'] = 'Please enter religion.';
    }

    if (CNIC === '') {
      isValid = false;
      errors['CNIC'] = 'Please enter CNIC.';
    }

    if (email === '') {
      isValid = false;
      errors['email'] = 'Please enter your email address.';
    }

    if (email !== '') {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors['email'] = 'Please enter a valid email address.';
      }
    }

    if (salary === '') {
      isValid = false;
      errors['salary'] = 'Please enter salary.';
    }

    if (currentAddress === '') {
      isValid = false;
      errors['currentAddress'] = 'Please enter current address.';
    }

    if (permanentAddress === '') {
      isValid = false;
      errors['permanentAddress'] = 'Please enter permanent address.';
    }

    if (selectedImage || selectedImage !== null || selectedImage.length > 0) {
      isValid = false;
      errors['selectedImage'] = 'Please chosse image.';
    }

    if (
      selectedExcelFile ||
      selectedExcelFile !== null ||
      selectedExcelFile.length > 0
    ) {
      isValid = false;
      errors['selectedExcelFile'] = 'Please chosse documents.';
    }

    setErrors(errors);

    return isValid;
  };
  const onGenderChange = (e) => {
    setGender(e.target.value);
  };
  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  let inputPropsDOB = {
    placeholder: 'Date of birth',
  };

  let inputPropsJoing = {
    placeholder: 'Joining date',
  };

  const onRemoveImage = (file, index) => {
    const myNewFiles = [...selectedImage]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedImage(myNewFiles);
  };

  const onRemoveFile = (file, index) => {
    const myNewFiles = [...selectedExcelFile]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedExcelFile(myNewFiles);
  };

  const handleImageSelect = (acceptedFile) => {
    setSelectedImage(
      acceptedFile.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleFileSelect = (acceptedFile) => {
    acceptedFile.map((file) => {
      setSelectedExcelFile((selectedExcelFile) => [...selectedExcelFile, file]);
    });
  };

  return (
    <Fragment>
      <Breadcrumb
        parent='Employees'
        parentLink='/human-resources/employee-list'
        title='Add Employees'
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
                          value={regNumber !== 0 ? regNumber : 0}
                          onChange={(e) => setRegNumber(regNumber)}
                        ></Input>
                        <div className='text-danger'>{errors.regNumber}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input
                          name='firstName'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter first name'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.firstName}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input
                          name='lastName'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter last name'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.lastName}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup className='form-row'>
                        <Label htmlFor='gender'>Gender</Label>

                        <Input
                          name='gender'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={gender ? gender : ''}
                          onChange={onGenderChange}
                        >
                          <option disabled value=''>
                            Select Gender
                          </option>
                          <option key={1} value={'male'}>
                            Male
                          </option>
                          <option key={2} value={'female'}>
                            Female
                          </option>
                          <option key={3} value={'other'}>
                            Other
                          </option>
                        </Input>
                        <div className='text-danger'>{errors.gender}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup className='form-row'>
                        <Label htmlFor='role'>Role</Label>

                        <Input
                          name='role'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={role ? role : ''}
                          onChange={onRoleChange}
                        >
                          <option disabled value=''>
                            Select Role
                          </option>
                          <option key={1} value={'teacher'}>
                            Teacher
                          </option>
                          <option key={2} value={'principal'}>
                            Principal
                          </option>
                        </Input>
                        <div className='text-danger'>{errors.role}</div>
                      </FormGroup>
                    </Col>
                    <Col sm='12' md='6'>
                      <FormGroup>
                        <Label className='form-label'>{DateOfBirth}</Label>
                        <Datetime
                          timeFormat={false}
                          dateFormat='YYYY-MM-DD'
                          inputProps={inputPropsDOB}
                          value={dateOfBirth ? dateOfBirth : 'YYYY-MM-DD'}
                          onChange={(date) => setDateOfBirth(date)}
                        />
                        <div className='text-danger'>{errors.dateOfBirth}</div>
                      </FormGroup>
                    </Col>

                    <Col sm='12' md='6'>
                      <FormGroup>
                        <Label className='form-label'>{PhoneNumber}</Label>
                        <PhoneInput
                          enableSearch
                          disableSearchIcon
                          inputStyle={{ width: '100%' }}
                          searchStyle={{
                            margin: '0',
                            width: '97%',
                            height: '30px',
                          }}
                          country={'ae'}
                          value={phoneNumber ? phoneNumber : ''}
                          onChange={(e) => setPhoneNumber(e)}
                          placeholder='Enter phone Number'
                        />
                        <div className='text-danger'>{errors.phoneNumber}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='religion'>Religion</Label>
                        <Input
                          name='religion'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter religion'
                          value={religion}
                          onChange={(e) => setReligion(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.religion}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='CNIC'>CNIC</Label>
                        <Input
                          name='CNIC'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter CNIC'
                          value={CNIC}
                          onChange={(e) => setCNIC(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.CNIC}</div>
                      </FormGroup>
                    </Col>

                    <Col sm='6' md='6'>
                      <FormGroup>
                        <Label className='form-label'>{EmailAddress}</Label>
                        <Input
                          className='form-control'
                          type='email'
                          placeholder='Enter email currentAddress'
                          value={email ? email : ''}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='text-danger'>{errors.email}</div>
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

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='salary'>Salary</Label>
                        <Input
                          name='salary'
                          type='text'
                          className='form-control digits'
                          placeholder='Enter salary'
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.salary}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={12}>
                      <FormGroup>
                        <Label htmlFor='currentAddress'>Current Address</Label>
                        <Input
                          name='currentAddress'
                          type='textarea'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter current currentAddress'
                          value={currentAddress}
                          onChange={(e) => setCurrentAddress(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.currentAddress}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={12}>
                      <FormGroup>
                        <Label htmlFor='permanentAddress'>
                          Permanent Address
                        </Label>
                        <Input
                          name='permanentAddress'
                          type='textarea'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter current permanentAddress'
                          value={permanentAddress}
                          onChange={(e) => setPermanentAddress(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.permanentAddress}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm='12' md='12'>
                      <Dropzone
                        onDrop={(file) => handleImageSelect(file)}
                        // multiple={false}
                        accept={'image/jpg,image/jpeg,image/png'}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p style={{ padding: '0px 15px', textAlign: "center" }}>
                              Drag 'n' drop image here, or click to select files
                            </p>
                            <em style={{ padding: '0px 15px', textAlign: "center" }}>
                              (Only .jpg, .jpeg and .png are acceptable)
                            </em>
                          </div>
                        )}
                      </Dropzone>
                      <div className='text-danger'>{errors.selectedImage}</div>

                      {selectedImage &&
                        selectedImage !== null &&
                        selectedImage.length > 0 && (
                          <Col sm={12} md={12}>
                            <h6>Selected Image</h6>
                            <aside className='thumbsContainer'>
                              {selectedImage.map((file, i) => (
                                <div className='thumb' key={file.name}>
                                  <div className='thumbInner'>
                                    <span
                                      onClick={() => onRemoveImage(file, i)}
                                      className='closebtn'
                                    >
                                      &times;
                                    </span>
                                    <img className='img' src={file.preview} />
                                  </div>
                                </div>
                              ))}
                            </aside>
                          </Col>
                        )}
                    </Col>
                    <Col sm='12' md='12'>
                      <Dropzone onDrop={(file) => handleFileSelect(file)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p style={{ padding: '0px 15px', textAlign: "center" }}>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                            <em style={{ padding: '0px 15px', textAlign: "center" }}>
                              (Only .xlsx, .xlsm, .csv, slk, .html, .dif and
                              .xltx file are acceptable)
                            </em>
                          </div>
                        )}
                      </Dropzone>
                      <div className='text-danger'>
                        {errors.selectedExcelFile}
                      </div>

                      {selectedExcelFile &&
                        selectedExcelFile !== null &&
                        selectedExcelFile.length > 0 && (
                          <>
                            <h6>Selected files</h6>
                            <ListGroup className="list-group-flush">
                            {selectedExcelFile.map((file, i) => (
                               <Fragment key={i}>
                              <ListGroupItem>
                                <Row className="justify-content-between">
                                  <Col sm={9}>
                                  {file.path}{' '}
                                  </Col>
                                  <Col sm={3}>
                                  <span
                                     onClick={() => onRemoveFile(file, i)}
                                    className='file-close'
                                  >
                                    &times;
                                  </span>
                                  </Col>
                                </Row>
                                </ListGroupItem>
                              </Fragment>
                              ))}
                              </ListGroup>
                          </>
                        )}
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

export default AddEmployeeForm;
