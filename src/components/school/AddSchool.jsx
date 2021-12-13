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
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Breadcrumb from '../../layout/breadcrumb';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
import {
  addSchool,
  getCountries,
  getStates,
  getCities,
  getStateCities,
  uploadImage,
  clearMessage,
  clearError,
} from '../../actions/schoolAction';
import { loadPackages } from '../../actions/packageAction';
import { loadSalesPersons } from '../../actions/salesPersonsAction';

const AddSchool = ({
  School: { countries, states, cities, error, message },
  Package: { packages },
  Auth: { userId },
  SalesPersons: { salesPersons },
  addSchool,
  loadPackages,
  loadSalesPersons,
  getCountries,
  getStates,
  getStateCities,
  getCities,
  uploadImage,
  clearMessage,
  clearError,
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
  const [packageId, setPackageId] = useState('');
  const [salesPersonId, setSalesPersonId] = useState('');
  const [price, setPrice] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  const [selectedImage, setSelectedImage] = useState([]);

  const [errors, setErrors] = useState('');

  useEffect(() => {
    loadPackages();
    loadSalesPersons();
    getCountries();

    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
      setSchoolName('');
      setLong('');
      setLat('');
      setSelectedCountry([]);
      setSelectedState([]);
      setSelectedCity([]);
      setAddress('');
      setPostalCode('');
      setPrincipal('');
      setPrincipalEmail('');
      setSchoolEmail('');
      setPrincipalContactNumber('');
      setSalesPersonId('');
      setNoOfStudent(0);
      setPackageId('');
      setSchoolContactNumber('');
      setPrice(0);
      setInitialPrice('');
      setSelectedImage([]);
      setPayAmount('');
      UserMenuRedirect(`/virtualsoft/admin/school/school-listing`);
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    // eslint-disable-next-line
  }, [error, message]);

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

  const history = useHistory();

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
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

    if (salesPersonId === '') {
      isValid = false;
      errors['salesPersonId'] = 'Please enter sales-person-id';
    }
    if (noOfStudent === '' || noOfStudent === 0) {
      isValid = false;
      errors['noOfStudent'] = 'Please enter no. of student';
    }

    if (packageId === '') {
      isValid = false;
      errors['packageId'] = 'Please select packages.';
    }

    if (initialPrice === '' || parseInt(initialPrice) === 0) {
      isValid = false;
      errors['initialPrice'] = 'Please enter initial price.';
    }
    if (
      parseInt(initialPrice) > 0 &&
      parseInt(initialPrice) > parseInt(price)
    ) {
      isValid = false;
      errors['initialPrice'] =
        "Initial price can't be greater than package price.";
    }

    if (payAmount === '' || parseInt(payAmount) === 0) {
      isValid = false;
      errors['payAmount'] = 'Please enter pay-amount.';
    }
    if (
      parseInt(payAmount) > 0 &&
      parseInt(payAmount) > parseInt(initialPrice)
    ) {
      isValid = false;
      errors['payAmount'] = "Pay-amount can't be greater than initial price.";
    }

    if (selectedImage === null || selectedImage.length <= 0) {
      isValid = false;
      errors['selectedImage'] = 'Please chosse image.';
    }

    setErrors(errors);
    return isValid;
  };

  const onPackageChange = (e) => {
    const selectedPackage = packages[e.target.value - 1];
    setPackageId(selectedPackage.id);
    setPrice(selectedPackage.price);
  };

  const onSalePersonChange = (e) => {
    const salesPerson = salesPersons[e.target.value];
    setSalesPersonId(salesPerson.id);
  };
  const getImage = (image) => {
    return new Promise((resolve, reject) => {
      const res = uploadImage(image);
      resolve(res);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const image = new FormData();
      image.append('image', selectedImage[0]);
      getImage(image).then((schoolImage) => {
        const newSchool = {
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
          package_id: packageId,
          initial_amount: parseInt(initialPrice),
          amount_paid: parseInt(payAmount),
          sales_person_id: salesPersonId,
          principal_name: principal,
          principal_email: principalEmail,
          principal_phone: principalContactNumber,
          school_email: schoolEmail,
          school_phone: schoolContactNumber,
          created_by: userId,
        };

        addSchool(newSchool);
      });
    } else {
      setTimeout(() => {
        toast.error('Errors occur while adding new school');
      }, 200);
    }
  };

  const onRemoveImage = (file, index) => {
    const myNewFiles = [...selectedImage]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedImage(myNewFiles);
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
  return (
    <Fragment>
      <Breadcrumb
        parent='Schools'
        parentLink='/virtualsoft/admin/school/school-listing'
        title='Add School'
      />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className='media'>
                        <div className='media-body align-self-center'>
                          <h5 className='mt-0 user-name'>School Details</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} sm={12}>
                      <hr />
                    </Col>
                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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
                    <Col sm={12} md={4} lg={3}>
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
                    <Col sm={12} md={4} lg={3}>
                      <FormGroup>
                        <Label htmlFor='noOfStudent'>No. Of Student</Label>
                        <Input
                          name='noOfStudent'
                          type='number'
                          className='form-control digits'
                          placeholder='Enter No. of students'
                          value={noOfStudent}
                          onChange={(e) => setNoOfStudent(e.target.value)}
                          min={0}
                        ></Input>
                        <div className='text-danger'>{errors.noOfStudent}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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
                    <Col sm={12} md={4} lg={3}>
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
                    </Col>

                    <Col sm={12} md={4} lg={3}>
                      <FormGroup>
                        <Label htmlFor='salesPersonId'>Sales Person</Label>
                        <Input
                          name='salesPersonId'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={salesPersonId ? salesPersonId.name : ''}
                          onChange={onSalePersonChange}
                        >
                          <option disabled value=''>
                            Select
                          </option>
                          {salesPersons &&
                            salesPersons.map((selection, index) => (
                              <option key={selection.id} value={index}>
                                {selection.name}
                              </option>
                            ))}
                        </Input>

                        <div className='text-danger'>
                          {errors.salesPersonId}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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

                    <Col sm={12} md={4} lg={3}>
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
                    <Col sm={12} md={4} lg={3}>
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
                    <Col sm={12} md={12} lg={12}>
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

                    <Col sm={12} sm={12}>
                      <hr />
                    </Col>
                    <Col sm={12} md={12}>
                      <div className='media'>
                        <div className='media-body align-self-center'>
                          <h5 className='mt-0 user-name'>Package Details</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} sm={12}>
                      <hr />
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                      <FormGroup className='form-row'>
                        <Label htmlFor='packageId'>Package</Label>

                        <Input
                          name='packageId'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={packageId ? packageId : ''}
                          onChange={onPackageChange}
                        >
                          <option disabled value=''>
                            Select
                          </option>
                          {packages &&
                            packages.map((selection, index) => (
                              <option key={selection.id} value={index + 1}>
                                {selection.label}
                              </option>
                            ))}
                        </Input>
                        <div className='text-danger'>{errors.packageId}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4} lg={3}>
                      <FormGroup>
                        <Label htmlFor='price'>Price</Label>
                        <Input
                          name='price'
                          type='number'
                          className='form-control digits'
                          placeholder='Enter price'
                          value={price !== 0 ? price : 0}
                          disabled
                          min={0}
                        ></Input>
                        <div className='text-danger'>{errors.price}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                      <FormGroup>
                        <Label htmlFor='initialPrice'>Initial Price</Label>
                        <Input
                          name='initialPrice'
                          type='number'
                          className='form-control digits'
                          placeholder='Enter initial price'
                          value={initialPrice}
                          onChange={(e) => setInitialPrice(e.target.value)}
                          min={0}
                        ></Input>
                        <div className='text-danger'>{errors.initialPrice}</div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4} lg={3}>
                      <FormGroup>
                        <Label htmlFor='payAmount'>Pay Amount</Label>
                        <Input
                          name='payAmount'
                          type='number'
                          className='form-control digits'
                          placeholder='Enter pay amount'
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          min={0}
                        ></Input>
                        <div className='text-danger'>{errors.payAmount}</div>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

AddSchool.propTypes = {
  School: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  Package: PropTypes.object.isRequired,
  SalesPersons: PropTypes.object.isRequired,
  loadSalesPersons: PropTypes.func.isRequired,
  loadPackages: PropTypes.func.isRequired,
  addSchool: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getStateCities: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
  Package: state.Package,
  SalesPersons: state.SalesPersons,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getStateCities,
  uploadImage,
  addSchool,
  loadPackages,
  loadSalesPersons,
  getCountries,
  getStates,
  getCities,
  clearMessage,
  clearError,
})(AddSchool);
