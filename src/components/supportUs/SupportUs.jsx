import React, { Fragment, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  Form,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { loadSchools } from '../../actions/schoolAction';
import {
  support,
  clearError,
  clearMessage,
} from '../../actions/supportActions';
import Breadcrumb from '../../layout/breadcrumb';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const SupportUs = ({
  School: { schools },
  Support: { message, error },
  loadSchools,
  support,
  clearError,
  clearMessage,
}) => {
  useEffect(() => {
    loadSchools();
    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      setDescription('');
      setSubject('');
      setCommunicationType('');
      setSchoolData(null);
      setIsEmail('');

      clearMessage();
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    //eslint-disable-next-line
  }, [message, error]);

  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');

  const [communicationType, setCommunicationType] = useState('');
  const [schoolData, setSchoolData] = useState(null);
  const [isEmail, setIsEmail] = useState('');
  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (communicationType === '') {
      isValid = false;
      errors['communicationType'] = 'Please select Communication Type.';
    }

    if (schoolData === null) {
      isValid = false;
      errors['schoolData'] = 'Please select school.';
    }
    if (description === '') {
      isValid = false;
      errors['description'] = 'Please select description';
    }
    if (isEmail === 'E') {
      if (subject === '') {
        isValid = false;
        errors['subject'] = 'Please select subject';
      }
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        com_type: isEmail,
        school_id: schoolData[0].id,
        subject: isEmail === 'E' ? subject : '',
        message: description,
      };
      support(data);
    }
  };

  const onChangeSchool = (e) => {
    const schoolData = schools.filter((school) => {
      return school.id.indexOf(e.target.value) !== -1;
    });
    setSchoolData(schoolData);
  };

  const onChangeCommunication = (e) => {
    setCommunicationType(e.target.value);
    if (e.target.value === 'E') {
      setIsEmail('E');
    } else {
      setIsEmail('S');
    }
  };
  return (
    <Fragment>
      <Breadcrumb parent={null} title='Support' />
      <Container fluid={true}>
        <Card>
          <CardBody className='p-0'>
            <div className='user-profile'>
              <div className='profile-img-style'>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='communicationType'>
                          Communication Type
                        </Label>
                        <Input
                          className='form-control digits'
                          type='select'
                          name='communicationType'
                          value={communicationType ? communicationType : ''}
                          onChange={(e) => onChangeCommunication(e)}
                        >
                          <option disabled value=''>
                            Select Communication Type
                          </option>
                          <option key={1} value={'E'}>
                            Email
                          </option>
                          <option key={2} value={'S'}>
                            SMS
                          </option>
                        </Input>

                        <div className='text-danger'>
                          {errors.communicationType}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='schools'>Select School</Label>
                        <Input
                          className='form-control digits'
                          type='select'
                          name='schools'
                          value={
                            schools && schoolData !== null ? schools.name : ''
                          }
                          onChange={(e) => onChangeSchool(e)}
                        >
                          <option disabled value=''>
                            Select School
                          </option>

                          {schools !== null &&
                            schools.map((school, index) => (
                              <option key={index} value={school.id}>
                                {school.name}
                              </option>
                            ))}
                        </Input>

                        <div className='text-danger'>{errors.schoolData}</div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={12}>
                      <div
                        className='profile-img-style'
                        style={{ paddingTop: '0px' }}
                      >
                        <Row>
                          <Col lg='12' xl='12'>
                            <ListGroup className='list-group-flush'>
                              <ListGroupItem>
                                <Row className='justify-content-around'>
                                  <Col sm={5}>
                                    <h6>School Name :</h6>
                                  </Col>
                                  <Col sm={5}>
                                    {' '}
                                    {schoolData !== null && schoolData[0].name}
                                  </Col>
                                </Row>
                              </ListGroupItem>
                              <ListGroupItem>
                                <Row className='justify-content-around'>
                                  <Col sm={5}>
                                    <h6>Contact :</h6>
                                  </Col>
                                  <Col sm={5}>
                                    {schoolData !== null && schoolData[0].phone}
                                  </Col>
                                </Row>
                              </ListGroupItem>

                              <ListGroupItem>
                                <Row className='justify-content-around'>
                                  <Col sm={5}>
                                    <h6>City/Country :</h6>
                                  </Col>
                                  <Col sm={5}>
                                    {' '}
                                    {schoolData !== null &&
                                      `${schoolData[0].country}/${schoolData[0].city}`}
                                  </Col>
                                </Row>
                              </ListGroupItem>

                              <ListGroupItem>
                                <Row className='justify-content-around'>
                                  <Col sm={5}>
                                    <h6>Principal :</h6>
                                  </Col>
                                  <Col sm={5}>
                                    {schoolData !== null &&
                                      schoolData[0].principal_name}
                                  </Col>
                                </Row>
                              </ListGroupItem>
                            </ListGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {isEmail !== '' && (
                      <Fragment>
                        {isEmail === 'E' && (
                          <Col sm={12} md={12}>
                            <FormGroup>
                              <Label htmlFor='subject'>Subject</Label>
                              <Input
                                name='subject'
                                type='text'
                                className='form-control digits'
                                placeholder='Enter subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                              ></Input>
                              <div className='text-danger'>
                                {errors.subject}
                              </div>
                            </FormGroup>
                          </Col>
                        )}
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <Label htmlFor='description'>Description</Label>
                            <Input
                              name='description'
                              type='textarea'
                              className='form-control digits'
                              placeholder='Description...'
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></Input>
                            <div className='text-danger'>
                              {errors.description}
                            </div>
                          </FormGroup>
                        </Col>
                      </Fragment>
                    )}
                    <Col sm={12} md={12}>
                      <Button
                        type='submit'
                        className='btn btn-sm float-right'
                        color='primary'
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

SupportUs.propTypes = {
  School: PropTypes.object.isRequired,
  Support: PropTypes.object.isRequired,
  loadSchools: PropTypes.func.isRequired,
  support: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
  Support: state.Support,
});

export default connect(mapStateToProps, {
  loadSchools,
  support,
  clearMessage,
  clearError,
})(SupportUs);
