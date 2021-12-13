/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { Fragment, useEffect, useState } from 'react';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import {
  updateSchool,
  getCountries,
  getStates,
  getStateCities,
  getCities,
  uploadImage,
} from '../../actions/schoolAction';

const UpdateSchool = ({
  School: { countries, states, cities },
  Auth: { userId },
  modal,
  toggle,
  data,
  uploadImage,
  updateSchool,
  getCountries,
  getStates,
  getCities,
  getStateCities,
}) => {
  const [schoolName, setSchoolName] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [principal, setPrincipal] = useState('');
  const [principalEmail, setPrincipalEmail] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [principalContactNumber, setPrincipalContactNumber] = useState('');
  const [schoolContactNumber, setSchoolContactNumber] = useState('');
  const [noOfStudent, setNoOfStudent] = useState(0);
  const [selectedImage, setSelectedImage] = useState([]);
  const [defaultImage, setDefaultImage] = useState('');

  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (data) {
      setSelectedCountry([{ country: data.country }]);
      if (data.country !== '') {
        getStates(data.country);
        setSelectedState([{ name: data.state }]);
      }
      if (data.state !== '') {
        getCities(data.country, data.state);
        setSelectedCity([data.city]);
      }
      setSchoolName(data.name);
      setAddress(data.address);
      setPostalCode(data.postal_code);
      setPrincipal(data.principal_name);
      setPrincipalEmail(data.principal_email);
      setPrincipalContactNumber(data.principal_phone);
      setNoOfStudent(data.no_of_stds);
      setSelectedCity([data.city]);
      setLong(data.longitude);
      setLat(data.latitude);
      setSchoolContactNumber(data.phone);
      setSchoolEmail(data.email);
      setDefaultImage(data.logo);
    }
    getCountries();

    // eslint-disable-next-line
  }, []);

  const onCountriesChange = (country) => {
    console.log('inside function', country);
    setSelectedState([]);
    setSelectedCity([]);
    setSelectedCountry(country);
    if (country.length > 0) {
      getStates(country[0].country);
      getCities(country[0].country);
    }
  };

  const onStatesChange = (state) => {
    setSelectedCity([]);
    setSelectedState(state);
    if (state.length > 0) {
      getStateCities(selectedCountry[0].country, state[0].name);
    }
  };

  const onCitiesChange = (city) => {
    setSelectedCity(city);
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (schoolName === '') {
      isValid = false;
      errors['schoolName'] = 'Please enter school name.';
    }

    if (long === '') {
      isValid = false;
      errors['long'] = 'Please enter Longitude.';
    }
    if (lat === '') {
      isValid = false;
      errors['lat'] = 'Please enter Latitude.';
    }

    if (address === '') {
      isValid = false;
      errors['address'] = 'Please enter address.';
    }
    if (selectedCountry.length === 0) {
      isValid = false;
      errors['selectedCountry'] = 'Please enter country.';
      errors['selectedState'] = 'Please enter state.';
      errors['selectedCity'] = 'Please enter city.';
    }
    if (selectedCountry.length > 0) {
      if (states !== null) {
        if (states.length > 0 && selectedState.length === 0) {
          isValid = false;
          errors['selectedState'] = 'Please enter state.';
          errors['selectedCity'] = 'Please enter city.';
        }
      }
      if (states !== null && states.length > 0 && selectedState.length > 0) {
        if (cities !== null) {
          if (cities.length > 0 && selectedCity.length === 0) {
            isValid = false;
            errors['selectedCity'] = 'Please enter city.';
          }
        }
      } else {
        if (cities !== null) {
          if (cities.length > 0 && selectedCity.length === 0) {
            isValid = false;
            errors['selectedCity'] = 'Please enter city.';
          }
        }
      }
    }

    if (postalCode === '') {
      isValid = false;
      errors['postalCode'] = 'Please enter postal-code';
    }
    if (principal === '') {
      isValid = false;
      errors['principal'] = 'Please enter principal name';
    }
    if (principalEmail === '') {
      isValid = false;
      errors['principalEmail'] = 'Please enter principal email address.';
    }

    if (principalEmail !== '') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(principalEmail)) {
        isValid = false;
        errors['principalEmail'] =
          'Please enter a valid principal email address.';
      }
    }
    if (principalContactNumber === '') {
      isValid = false;
      errors['principalContactNumber'] =
        'Please enter your principal contact number.';
    }
    if (principalContactNumber !== '') {
      let pattern = new RegExp(/^[0-9]{1,20}$/i);
      if (!pattern.test(principalContactNumber)) {
        isValid = false;
        errors['principalContactNumber'] =
          'Please enter a valid principal contact number.';
      }
    }

    if (schoolEmail === '') {
      isValid = false;
      errors['schoolEmail'] = 'Please enter school email address.';
    }
    if (schoolEmail !== '') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(schoolEmail)) {
        isValid = false;
        errors['schoolEmail'] = 'Please enter school email address.';
      }
    }

    if (schoolContactNumber === '') {
      isValid = false;
      errors['schoolContactNumber'] =
        'Please enter your school contact number.';
    }
    if (schoolContactNumber !== '') {
      let pattern = new RegExp(/^[0-9]{1,20}$/i);
      if (!pattern.test(schoolContactNumber)) {
        isValid = false;
        errors['schoolContactNumber'] =
          'Please enter a valid school contact number.';
      }
    }

    if (schoolEmail !== '') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(schoolEmail)) {
        isValid = false;
        errors['schoolEmail'] = 'Please enter a valid school email address.';
      }
    }

    if (noOfStudent === '' || noOfStudent === 0) {
      isValid = false;
      errors['noOfStudent'] = 'Please enter no. of student';
    }

    if (
      defaultImage === '' &&
      (selectedImage === null || selectedImage.length <= 0)
    ) {
      isValid = false;
      errors['selectedImage'] = 'Please chosse image.';
    }

    setErrors(errors);
    return isValid;
  };

  const getImage = (image) => {
    return new Promise((resolve, reject) => {
      const res = uploadImage(image);
      resolve(res);
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      const image = new FormData();
      if (selectedImage && selectedImage !== null && selectedImage.length > 0) {
        const image = new FormData();
        image.append('image', selectedImage[0]);
        getImage(image).then((schoolImage) => {
          const newSchool = {
            id: data.id,
            name: schoolName,
            country: selectedCountry[0].country,
            state: selectedState.length !== 0 ? selectedState[0].name : '',
            city: selectedCity.length !== 0 ? selectedCity[0] : '',
            address: address,
            no_of_stds: noOfStudent,
            postal_code: postalCode,
            logo: schoolImage.data,
            longitude: long,
            latitude: lat,
            principal_name: principal,
            principal_email: principalEmail,
            principal_phone: principalContactNumber,
            school_email: schoolEmail,
            school_phone: schoolContactNumber,
            created_by: userId,
          };
          updateSchool(newSchool);
        });
      } else {
        const newSchool = {
          id: data.id,
          name: schoolName,
          country: selectedCountry[0].country,
          state: selectedState.length !== 0 ? selectedState[0].name : '',
          city: selectedCity.length !== 0 ? selectedCity[0] : '',
          address: address,
          no_of_stds: noOfStudent,
          postal_code: postalCode,
          logo: defaultImage,
          longitude: long,
          latitude: lat,
          school_email: schoolEmail,
          phone: schoolContactNumber,
          created_by: userId,
        };
        updateSchool(newSchool);
      }

      // Clear fields
      toggle();

      // });
    }
  };

  const onRemovedefaultImage = () => {
    setDefaultImage('');
  };

  const onRemoveImage = (file, index) => {
    const myNewFiles = [...selectedImage]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedImage(myNewFiles);
  };

  const handleImageSelect = (acceptedFile) => {
    setDefaultImage('');
    setSelectedImage(
      acceptedFile.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
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
          Update School
        </ModalHeader>
        <Form onSubmit={onUpdate}>
          <ModalBody>
            <Container fluid={true}>
              <Row>
                <Col sm={12} md={12}>
                  <Row>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='schoolName'>School Name</Label>
                        <Input
                          name='schoolName'
                          type='text'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter school name'
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.schoolName}</div>
                      </FormGroup>
                    </Col>
                    {/* <Col sm={12} md={6} >
                  <FormGroup>
                    <Label htmlFor='noOfStudent'>No. Of Student</Label>
                    <Input
                      name='noOfStudent'
                      type='number'
                      className='form-control digits'
                      placeholder='Enter No. of students'
                      value={noOfStudent}
                      onChange={(e) => setNoOfStudent(e.target.value)}
                      min= {0}
                    ></Input>
                    <div className='text-danger'>{errors.noOfStudent}</div>
                  </FormGroup>
                </Col> */}
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='schoolEmail'>School Email</Label>
                        <Input
                          name='schoolEmail'
                          type='email'
                          className='form-control digits'
                          placeholder='Enter school email'
                          value={schoolEmail}
                          onChange={(e) => setSchoolEmail(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.schoolEmail}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='schoolContactNumber'>
                          School Contact Number
                        </Label>
                        <Input
                          className='form-control'
                          type='text'
                          name='schoolContactNumber'
                          value={schoolContactNumber ? schoolContactNumber : ''}
                          placeholder='School Contact Number'
                          onChange={(e) =>
                            setSchoolContactNumber(e.target.value)
                          }
                          maxLength={20}
                        ></Input>
                        <div className='text-danger'>
                          {errors.schoolContactNumber}
                        </div>
                      </FormGroup>
                    </Col>
                    {/* <Col sm={12} md={4} >
                  <FormGroup>
                    <Label htmlFor='principal'>Principal</Label>
                    <Input
                      name='principal'
                      type='text'
                      max='100'
                      className='form-control digits'
                      placeholder='Enter principal name'
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                    ></Input>
                    <div className='text-danger'>{errors.principal}</div>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4} >
                  <FormGroup>
                    <Label htmlFor='principalEmail'>Principal Email</Label>
                    <Input
                      name='principalEmail'
                      type='email'
                      max='100'
                      className='form-control digits'
                      placeholder='Enter principal email'
                      value={principalEmail}
                      onChange={(e) => setPrincipalEmail(e.target.value)}
                    ></Input>
                    <div className='text-danger'>
                      {errors.principalEmail}
                    </div>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4} >
                  <FormGroup>
                    <Label htmlFor='principalContactNumber'>
                      Principal Contact Number
                    </Label>
                    <Input
                      className='form-control'
                      type='text'
                      name='principalContactNumber'
                      value={
                        principalContactNumber ? principalContactNumber : ''
                      }
                      placeholder='Principal Contact Number'
                      onChange={(e) =>
                        setPrincipalContactNumber(e.target.value)
                      }
                      maxLength={20}
                    ></Input>
                    <div className='text-danger'>
                      {errors.principalContactNumber}
                    </div>
                  </FormGroup>
                </Col> */}

                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='countries'>Select Country</Label>
                        <Typeahead
                          id='multiple-typeahead'
                          clearButton
                          labelKey='country'
                          options={countries !== null ? countries : []}
                          selected={selectedCountry}
                          placeholder='Select Country....'
                          onChange={(data) => onCountriesChange(data)}
                        />

                        <div className='text-danger'>
                          {errors.selectedCountry}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='states'>Select State</Label>
                        <Typeahead
                          id='multiple-typeahead'
                          clearButton
                          labelKey='name'
                          options={
                            selectedCountry.length > 0 &&
                            states !== null &&
                            states.length > 0
                              ? states
                              : []
                          }
                          selected={selectedState}
                          placeholder='Select State....'
                          onChange={(data) => onStatesChange(data)}
                        />
                        <div className='text-danger'>
                          {errors.selectedState}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='cities'>Select City</Label>
                        <Typeahead
                          id='multiple-typeahead'
                          clearButton
                          labelKey=''
                          options={
                            states !== null && states.length > 0
                              ? selectedState.length !== 0 &&
                                cities !== null &&
                                cities.length > 0
                                ? cities
                                : []
                              : cities !== null && cities.length > 0
                              ? cities
                              : []
                          }
                          selected={selectedCity}
                          placeholder='Select City....'
                          onChange={(data) => onCitiesChange(data)}
                        />

                        <div className='text-danger'>{errors.selectedCity}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='postalCode'>Postal Code</Label>
                        <Input
                          name='postalCode'
                          type='text'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter postal code'
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.postalCode}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='lat'>Latitude</Label>
                        <Input
                          name='lat'
                          type='text'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter latitude'
                          value={lat}
                          onChange={(e) => setLat(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.lat}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <Label htmlFor='long'>Longitude</Label>
                        <Input
                          name='long'
                          type='text'
                          max='100'
                          className='form-control digits'
                          placeholder='Enter longitude'
                          value={long}
                          onChange={(e) => setLong(e.target.value)}
                        ></Input>
                        <div className='text-danger'>{errors.long}</div>
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
                    <Col sm={12} md={12}>
                      <Label htmlFor='selectedImage'>School Image</Label>
                      <Dropzone
                        onDrop={(file) => handleImageSelect(file)}
                        multiple={false}
                        accept={'image/jpg,image/jpeg,image/png'}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p
                              style={{
                                padding: '0px 15px',
                                textAlign: 'center',
                              }}
                            >
                              Drag 'n' drop image here, or click to select files
                            </p>
                            <em
                              style={{
                                padding: '0px 15px',
                                textAlign: 'center',
                              }}
                            >
                              (Only .jpg, .jpeg and .png are acceptable)
                            </em>
                          </div>
                        )}
                      </Dropzone>
                      <div className='text-danger'>{errors.selectedImage}</div>

                      {selectedImage &&
                      selectedImage !== null &&
                      selectedImage.length > 0 ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          {defaultImage !== '' && (
                            <>
                              <h6>Selected Image</h6>
                              <aside className='thumbsContainer'>
                                <div className='thumb'>
                                  <div className='thumbInner'>
                                    <span
                                      onClick={onRemovedefaultImage}
                                      className='closebtn'
                                    >
                                      &times;
                                    </span>
                                    <img className='img' src={defaultImage} />
                                  </div>
                                </div>
                              </aside>
                            </>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              className='btn btn-sm float-right  btn-air-primary'
              color='primary'
              type='submit'
            >
              Update
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

UpdateSchool.propTypes = {
  School: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  updateSchool: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  getStateCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getStateCities,
  updateSchool,
  getCountries,
  getStates,
  getCities,
  uploadImage,
})(UpdateSchool);
