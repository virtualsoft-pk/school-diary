import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  TabContent,
  TabPane,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { Password, LogIn, UserEmail } from '../constant';
import { ToastContainer } from 'react-toastify';
import { login, clearError, clearMessage } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
// import logo from '../assets/images/login.png';
// import ReCaptchaV2 from 'react-google-recaptcha';
import logo from '../assets/images/logo/login.png';

const Login = ({
  Auth: { isAuthenticated, error, message },
  login,
  clearError,
  clearMessage,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/virtualsoft/admin/dashboard');
    }

    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }

    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }

    if (localStorage.getItem('layout_version') === 'dark-only') {
      document.body.className = 'dark-only';
    } else {
      document.body.className = 'light';
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, message]);

  const [togglePassword, setTogglePassword] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const [errors, setErrors] = useState('');

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};
    let isValid = true;

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
        errors['email'] =
          'Please enter a valid email address(e.g. jane@gmail.com).';
      }
    }

    if (password === '') {
      isValid = false;
      errors['password'] = 'Please enter password.';
    }
    if (password !== '') {
      if (password.length < 8 || password.length > 16) {
        isValid = false;
        errors['password'] =
          'The password must be between 8-16 charters in length.';
      }
    }
    setErrors(errors);

    return isValid;
  };

  const onSubmitAdmin = (e) => {
    e.preventDefault();
    console.log('inside onSubmitAdmin');
    if (validate()) {
      login({
        email,
        password,
      });
      // const admin = true;
      // login(
      //   admin,
      //   {
      //   email,
      //   password,
      // });
    }
  };
  // const onSubmitUser = (e) => {
  //   e.preventDefault();
  //   console.log("inside onSubmitAdmin")
  //   if (validate()) {
  //     const admin = false;
  //     login(
  //       admin,
  //       {
  //       email,
  //       password,
  //     });
  //   }
  // };

  return (
    <Container fluid={true} className='p-0'>
      <ToastContainer />
      <Row>
        <Col xs='12'>
          <div className='login-card'>
            <div>
              <div>
                <div className='logo'>
                  <img
                    className='img-fluid for-light'
                    src={require('../assets/images/logo/login.png')}
                    alt=''
                  />
                  <img
                    className='img-fluid for-dark'
                    src={require('../assets/images/logo/logo_dark.png')}
                    alt=''
                  />
                </div>
              </div>

              <div className='login-main login-tab'>
                <TabContent className='content-login'>
                  <TabPane className='fade show'>
                    <Form className='theme-form'>
                      <h4>Login</h4>
                      <p>{'Enter your credentials'}</p>
                      <FormGroup>
                        <Label className='col-form-label'>{UserEmail}</Label>
                        <Input
                          className='form-control'
                          type='email'
                          name='email'
                          value={email}
                          onChange={onChange}
                          placeholder='Enter user email'
                        />
                        <div className='text-danger'>{errors.email}</div>
                      </FormGroup>
                      <FormGroup>
                        <Label className='col-form-label'>{Password}</Label>
                        <Input
                          className='form-control'
                          type={togglePassword ? 'text' : 'password'}
                          name='password'
                          value={password}
                          onChange={onChange}
                          placeholder='Enter password'
                          maxLength='20'
                        />
                        <div
                          className='show-hide'
                          onClick={() => setTogglePassword(!togglePassword)}
                        >
                          <span className={togglePassword ? '' : 'show'}></span>
                        </div>
                        <div className='text-danger'>{errors.password}</div>
                      </FormGroup>
                      <FormGroup>
                        <div className='form-group mb-0 py-1'>
                          <Link to='!#'>
                            <small className='links'>Forget Password?</small>
                          </Link>
                        </div>
                      </FormGroup>
                      <br></br>
                      {/* <Row>
                        <Col xs={6}> */}
                      <div className='form-group mb-0'>
                        <Button
                          color='primary'
                          className='btn-block btn-sm'
                          type='submit'
                          value='Login'
                          onClick={onSubmitAdmin}
                        >
                          Admin
                        </Button>
                      </div>
                      {/* </Col> */}
                      {/* <Col xs={6}>
                        <div className='form-group mb-0'>
                        <Button
                          color='primary'
                          className='btn-block btn-sm'
                          type='submit'
                          value='Login'
                          onClick={onSubmitUser}
                        >
                          User
                        </Button>
                      </div>
                        </Col> */}
                      {/* </Row> */}
                    </Form>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
Login.propTypes = {
  Auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, { login, clearError, clearMessage })(
  Login
);
