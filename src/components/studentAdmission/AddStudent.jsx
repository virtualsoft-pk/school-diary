import React, { Fragment, useEffect, useState } from 'react';
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
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Breadcrumb from '../../layout/breadcrumb';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateOfBirth, PhoneNumber, EmailAddress } from '../../constant';
import moment from 'moment';

import { getFeeType } from '../../actions/feeTypeAction';
import { getClass } from '../../actions/classAction';
import { getClassSection } from '../../actions/sectionAction';
import { getFeeDiscount } from '../../actions/feeDiscountActions';
import { getStudentCategory } from '../../actions/studentCatActions';

const AddStudent = ({
  Auth: {user},
  FeeType: {feeTypes},
  FeeDiscount: {feeDiscounts},
  Class: {classes},
  Section: {classSections},
  StudentCategory: {studentCat},
  getFeeType ,
  getClass,
  getClassSection,
  getFeeDiscount,
  getStudentCategory
}) => {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [section, setSection] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [religion, setReligion] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [CNIC, setCNIC] = useState('');

  const [email, setEmail] = useState('');
  const [admissionDate, setAdmissionDate] = useState(moment(new Date()));
  const [bloodGroup, setBloodGroup] = useState('');
  const [feeDiscount, setFeeDiscount] = useState('');
  const [feeType, setFeeType] = useState('');
  const [selectedExcelFile, setSelectedExcelFile] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  //guardian
  const [guardianName, setGuardianName] = useState('');
  const [relation, setRelation] = useState('');
  const [guardianContactNumber, setGuardianContactNumber] = useState('');
  const [guardianCNIC, setGuardianCNIC] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [guardianOccupation, setGuardianOccupation] = useState('');
  const [selectedGuardianImage, setSelectedGuardianImage] = useState([]);

  const [errors, setErrors] = useState('');

  useEffect(()=>{
    if(user !== null){
      getFeeType(user.school_id);
      getClass(user.school_id);
      getFeeDiscount(user.school_id);
      getStudentCategory(user.school_id)
    }
  },[])

  let inputProps = {
    placeholder: 'Date of birth',
  };
  let inputPropsJoing = {
    placeholder: 'Admission date',
  };
  const validate = () => {
    let errors = {};
    let isValid = true;

    if (firstName === '') {
      isValid = false;
      errors['firstName'] = 'Please enter first name.';
    }

    if (lastName === '') {
      isValid = false;
      errors['lastName'] = 'Please enter last name.';
    }

    if (email === '') {
      isValid = false;
      errors['email'] = 'Please enter email Address.';
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

    if (contactNumber === '') {
      isValid = false;
      errors['contactNumber'] = 'Please enter your contact number.';
    }
    if (contactNumber !== '') {
      var pattern = new RegExp(/^[0-9]{1,15}$/i);
      if (!pattern.test(contactNumber)) {
        isValid = false;
        errors['contactNumber'] = 'Please enter a valid contact number.';
      }
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
      admissionDate !== '' &&
      admissionDate !== undefined &&
      admissionDate !== null
    ) {
      if (typeof admissionDate === 'string') {
        isValid = false;
        errors['admissionDate'] = 'Please enter a valid date.';
      }
    }
    if (category === '') {
      isValid = false;
      errors['category'] = 'Please select category.';
    }

    if (feeType === '') {
      isValid = false;
      errors['feeType'] = 'Please select fee type.';
    }

    if (gender === '') {
      isValid = false;
      errors['gender'] = 'Please select gender.';
    }
    if (religion === '') {
      isValid = false;
      errors['religion'] = 'Please enter religion.';
    }

    if (currentAddress === '') {
      isValid = false;
      errors['currentAddress'] = 'Please enter current address.';
    }
    if (permanentAddress === '') {
      isValid = false;
      errors['permanentAddress'] = 'Please enter permanent address.';
    }

    if (admissionNumber === '') {
      isValid = false;
      errors['admissionNumber'] = 'Please enter admission number.';
    }
    if (rollNumber === '') {
      isValid = false;
      errors['rollNumber'] = 'Please enter roll number.';
    }

    if (schoolClass === '') {
      isValid = false;
      errors['schoolClass'] = 'Please enter class.';
    }
    if (section === '') {
      isValid = false;
      errors['section'] = 'Please enter section.';
    }

    if (CNIC === '') {
      isValid = false;
      errors['CNIC'] = 'Please enter CNIC.';
    }
    if (CNIC !== '') {
      var pattern = new RegExp(/^[0-9]{1,13}$/i);
      if (!pattern.test(contactNumber)) {
        isValid = false;
        errors['CNIC'] = 'Please enter a valid CNIC number.';
      }
    }
    if (bloodGroup === '') {
      isValid = false;
      errors['bloodGroup'] = 'Please enter blood group.';
    }

    if (feeDiscount === '' || feeDiscount === 0) {
      isValid = false;
      errors['feeDiscount'] = 'Please select fee discount.';
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

    if (guardianName === '') {
      isValid = false;
      errors['guardianName'] = 'Please enter guardian name.';
    }

    if (guardianEmail === '') {
      isValid = false;
      errors['guardianEmail'] = 'Please enter guardian email address.';
    }

    if (guardianEmail !== '') {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(guardianEmail)) {
        isValid = false;
        errors['guardianEmail'] =
          'Please enter a valid guardian email address.';
      }
    }

    if (guardianContactNumber === '') {
      isValid = false;
      errors['guardianContactNumber'] =
        'Please enter your guardian contact number.';
    }
    if (guardianContactNumber !== '') {
      var pattern = new RegExp(/^[0-9]{1,15}$/i);
      if (!pattern.test(guardianContactNumber)) {
        isValid = false;
        errors['guardianContactNumber'] =
          'Please enter a valid guardian contact number.';
      }
    }
    if (relation === '') {
      isValid = false;
      errors['relation'] = 'Please enter relation.';
    }

    if (guardianAddress === '') {
      isValid = false;
      errors['guardianAddress'] = 'Please enter guardian address.';
    }
    if (guardianOccupation === '') {
      isValid = false;
      errors['guardianOccupation'] = 'Please enter guardian occupation.';
    }
    if (guardianCNIC === '') {
      isValid = false;
      errors['guardianCNIC'] = 'Please enter guardian CNIC.';
    }
    if (guardianCNIC !== '') {
      var pattern = new RegExp(/^[0-9]{1,13}$/i);
      if (!pattern.test(contactNumber)) {
        isValid = false;
        errors['guardianCNIC'] = 'Please enter a valid CNIC number.';
      }
    }
    if (
      selectedGuardianImage ||
      selectedGuardianImage !== null ||
      selectedGuardianImage.length > 0
    ) {
      isValid = false;
      errors['selectedGuardianImage'] = 'Please chosse image.';
    }

    setErrors(errors);

    return isValid;
  };

  //   const editorRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
    }
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

  const onRemoveGuardianImage = (file, index) => {
    const myNewFiles = [...selectedGuardianImage]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedGuardianImage(myNewFiles);
  };

  const handleGuardianImageSelect = (acceptedFile) => {
    setSelectedGuardianImage(
      acceptedFile.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const onClassChange = (e) => {
    const classid = classes[e.target.value];
    setSchoolClass(classid.id);
    getClassSection(classid.id)
  };

  const onSectionChange = (e) => {
    const section = classSections[e.target.value];
    setSection(section.id);
  };
console.log("schoolllll classssss::::", schoolClass)
console.log(" classssss::::", classes)
console.log("class sectionssssssssssss:::", classSections)
console.log("class sections:::", section)
  return (
    <Fragment>
      <Breadcrumb
        parent='Students'
        parentLink='/student-admission/student-listing'
        title='Add Student'
      />
      <Container fluid={true}>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='admissionNumber'>
                          Admission Number
                        </Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='admissionNumber'
                          value={admissionNumber ? admissionNumber : ''}
                          placeholder='Enter admission number'
                          onChange={(e) => setAdmissionNumber(e.target.value)}
                        />
                        <div className='text-danger'>
                          {errors.admissionNumber}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='rollNumber'>Roll Number</Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='rollNumber'
                          value={rollNumber ? rollNumber : ''}
                          placeholder='Enter roll number'
                          onChange={(e) => setRollNumber(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.rollNumber}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='schoolClass'>Select Class</Label>
                        <Input
                          name='schoolClass'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={schoolClass ? schoolClass.label : ''}
                          onChange={onClassChange}
                        >
                          <option disabled value=''>
                            Select Class
                          </option>
                          {classes &&
                            classes.map((schoolclass, index) => (
                              <option key={schoolclass.id} value={index}>
                                {schoolclass.label}
                              </option>
                            ))}
                        </Input>

                        <div className='text-danger'>
                          {errors.schoolClass}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='section'>Select Section</Label>
                        <Input
                          name='section'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={section ? section.section_name : ''}
                          onChange={onSectionChange}
                        >
                          <option disabled value=''>
                            Select Section
                          </option>
                          {classSections && classSections !== null &&
                            classSections.map((section, index) => (
                              <option key={section.id} value={index}>
                                {section.section_name}
                              </option>
                            ))}
                        </Input>

                        <div className='text-danger'>
                          {errors.section}
                        </div>
                      </FormGroup>
                    </Col>
                    {/* <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='schoolClass'>Class</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='schoolClass'
                          value={schoolClass ? schoolClass : ''}
                          placeholder='Select Class'
                          onChange={(e) => setSchoolClass(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.schoolClass}</div>
                      </FormGroup>
                    </Col> */}
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='section'>Select Section</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='section'
                          value={section ? section : ''}
                          placeholder='Select Section'
                          onChange={(e) => setSection(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.section}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='firstName'
                          value={firstName ? firstName : ''}
                          placeholder='Enter first name'
                          onChange={(e) => setFirstName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.firstName}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='lastName'
                          value={lastName ? lastName : ''}
                          placeholder='Enter last name'
                          onChange={(e) => setLastName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.lastName}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='gender'>Select Gender</Label>
                        <Input
                          className='form-control digits'
                          type='select'
                          name='gender'
                          value={gender ? gender : ''}
                          onChange={(e) => setGender(e.target.value)}
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

                    <Col sm='12' md='4'>
                      <FormGroup>
                        <Label className='form-label'>Date Of Birth</Label>
                        <Datetime
                          timeFormat={false}
                          dateFormat='YYYY-MM-DD'
                          inputProps={inputProps}
                          value={dateOfBirth ? dateOfBirth : 'YYYY-MM-DD'}
                          onChange={(date) => setDateOfBirth(date)}
                        />
                        <div className='text-danger'>{errors.dateOfBirth}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='category'>Select Category</Label>
                        <Input
                          className='form-control digits'
                          type='select'
                          name='category'
                          value={category ? category : ''}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option disabled value=''>
                            Select Category
                          </option>
                          <option key={1} value={'general'}>
                            General
                          </option>
                          <option key={2} value={'special'}>
                            Special
                          </option>
                        </Input>

                        <div className='text-danger'>{errors.category}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='religion'>Religion</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='religion'
                          value={religion ? religion : ''}
                          placeholder='Enter religion'
                          onChange={(e) => setReligion(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.religion}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='contactNumber'>Contact Number</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='contactNumber'
                          value={contactNumber ? contactNumber : ''}
                          placeholder='Enter contact number'
                          onChange={(e) => setContactNumber(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.contactNumber}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='CNIC'>CNIC</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='CNIC'
                          value={CNIC ? CNIC : ''}
                          placeholder='Enetr CNIC'
                          onChange={(e) => setCNIC(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.CNIC}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='email'
                          value={email ? email : ''}
                          placeholder='Enter email address'
                          onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.email}</div>
                      </FormGroup>
                    </Col>

                    <Col sm='12' md='6'>
                      <FormGroup>
                        <Label className='form-label'>Admission Date</Label>
                        <Datetime
                          timeFormat={false}
                          dateFormat='YYYY-MM-DD'
                          inputProps={inputPropsJoing}
                          value={admissionDate ? admissionDate : 'YYYY-MM-DD'}
                          onChange={(date) => setAdmissionDate(date)}
                        />
                        <div className='text-danger'>
                          {errors.admissionDate}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='bloodGroup'>Blood Group</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='bloodGroup'
                          value={bloodGroup ? bloodGroup : ''}
                          placeholder='Enter blood group'
                          onChange={(e) => setBloodGroup(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.bloodGroup}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='feeDiscount'>Fee Discount</Label>
                        <Input
                          className='form-control'
                          type='number'
                          name='feeDiscount'
                          value={feeDiscount ? feeDiscount : ''}
                          placeholder='Enter fee discount'
                          onChange={(e) => setFeeDiscount(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.feeDiscount}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='feeType'>Select Fee Type</Label>
                        <Input
                          className='form-control digits'
                          type='select'
                          name='feeType'
                          value={feeType ? feeType : ''}
                          onChange={(e) => setFeeType(e.target.value)}
                        >
                          <option disabled value=''>
                            Select Fee Type
                          </option>
                          <option key={1} value={'monthly'}>
                            Monthly
                          </option>
                          <option key={2} value={'yearly'}>
                            Yearly
                          </option>
                        </Input>

                        <div className='text-danger'>{errors.feeType}</div>
                      </FormGroup>
                    </Col>
                    {/* Student Pic */}
                   

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='currentAddress'>Current Address</Label>
                        <Input
                          name='currentAddress'
                          type='textarea'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter current address'
                          value={currentAddress}
                          onChange={(e) => setCurrentAddress(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.currentAddress}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='permanentAddress'>
                          Permanent Address
                        </Label>
                        <Input
                          name='permanentAddress'
                          type='textarea'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter permanent address'
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
                          <Col sm={12} md={12}>
                            <h6>Selected files</h6>
                            <ListGroup className="list-group-flush" style={{marginBottom:"20px"}}>
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
                          </Col>
                        )}
                    </Col>

                    <Col sm={12} md={12}>
                      <hr />
                    </Col>
                    {/* Graudian info */}
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='guardianName'>Guardian Name</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='guardianName'
                          value={guardianName ? guardianName : ''}
                          placeholder='Enter guardian name'
                          onChange={(e) => setGuardianName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.guardianName}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='relation'>Relation</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='relation'
                          value={relation ? relation : ''}
                          placeholder='Relation with student'
                          onChange={(e) => setRelation(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.relation}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='guardianEmail'>Guardian Email</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='guardianEmail'
                          value={guardianEmail ? guardianEmail : ''}
                          placeholder='Enter email address'
                          onChange={(e) => setGuardianEmail(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.guardianEmail}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='guardianContactNumber'>
                          Guardian Contact Number
                        </Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='guardianContactNumber'
                          value={
                            guardianContactNumber ? guardianContactNumber : ''
                          }
                          placeholder='Enter contact number'
                          onChange={(e) =>
                            setGuardianContactNumber(e.target.value)
                          }
                        ></Input>
                        <div className='text-danger'>
                          {errors.guardianContactNumber}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='guardianCNIC'>Guardian CNIC</Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='guardianCNIC'
                          value={guardianCNIC ? guardianCNIC : ''}
                          placeholder='Enter CNIC'
                          onChange={(e) => setGuardianCNIC(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.guardianCNIC}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='guardianOccupation'>
                          Guardian Occupation
                        </Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='guardianOccupation'
                          value={guardianOccupation ? guardianOccupation : ''}
                          placeholder='Enter occupation'
                          onChange={(e) =>
                            setGuardianOccupation(e.target.value)
                          }
                        ></Input>
                        <div className='text-danger'>
                          {errors.guardianOccupation}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={12}>
                      <FormGroup>
                        <Label htmlFor='guardianAddress'>
                          Guardian Address
                        </Label>
                        <Input
                          name='guardianAddress'
                          type='textarea'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter guardian address'
                          value={guardianAddress}
                          onChange={(e) => setGuardianAddress(e.target.value)}
                        ></Input>
                        <div className='text-danger'>
                          {errors.guardianAddress}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm='12' md='12'>
                      <Dropzone
                        onDrop={(file) => handleGuardianImageSelect(file)}
                        // multiple={false}
                        accept={'image/jpg,image/jpeg,image/png'}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p style={{ padding: '0px 15px', textAlign: "center" }}>
                              Drag 'n' drop image here, or click to select files
                            </p >
                            <em style={{ padding: '0px 15px', textAlign: "center" }}>
                              (Only .jpg, .jpeg and .png are acceptable)
                            </em>
                          </div>
                        )}
                      </Dropzone>
                      <div className='text-danger'>
                        {errors.selectedGuardianImage}
                      </div>

                      {selectedGuardianImage &&
                        selectedGuardianImage !== null &&
                        selectedGuardianImage.length > 0 && (
                          <Col sm={12} md={12}>
                            <h6>Selected Image</h6>
                            <aside className='thumbsContainer'>
                              {selectedGuardianImage.map((file, i) => (
                                <div className='thumb' key={file.name}>
                                  <div className='thumbInner'>
                                    <span
                                      onClick={() =>
                                        onRemoveGuardianImage(file, i)
                                      }
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

AddStudent.propTypes = {
  Auth: PropTypes.object.isRequired,
  FeeType: PropTypes.object.isRequired,
  FeeDiscount: PropTypes.object.isRequired,
  Class: PropTypes.object.isRequired,
  Section: PropTypes.object.isRequired,
  StudentCategory: PropTypes.object.isRequired,
  getFeeType: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  getClassSection: PropTypes.func.isRequired,
  getFeeDiscount: PropTypes.func.isRequired,
  getStudentCategory: PropTypes.func.isRequired,  
};
 
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Class: state.Class,
  FeeType: state.FeeType,
  Section: state.Section,
  FeeDiscount: state.FeeDiscount,
  StudentCategory: state.StudentCategory
});

export default connect(mapStateToProps, {
  getClass,
  getFeeType,
  getClassSection,
  getFeeDiscount,
  getStudentCategory
})(AddStudent);
