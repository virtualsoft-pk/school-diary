import React, { useEffect, Fragment, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainAppComponent from '../mainApp/MainAppComponent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({
  Auth: { isAuthenticated, userType },
  component: Component,
  isAdmin: IsAdmin,
  ...rest
}) => {
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');

  console.log('userType::', userType);

  // const RedirectBack = () => {
  //   if (userType === 'Superadmin') {
  //     console.log('User Type Admin:::>', userType);
  //   } else if (userType === 'Principal') {
  //     console.log('User Type Princi[pal]:::>', userType);
  //   } else {
  //     console.log('going backward::>:', userType);

  //     if (splitLocation[1] === 'virtualsoft' && splitLocation[2] === 'admin') {
  //       console.log('adminLogin::>', splitLocation[1], ' ', splitLocation[2]);
  //     } else {
  //       console.log('userLogin:>', splitLocation);
  //     }
  //   }
  // };

  return (
    <Fragment>
      <Route
        {...rest}
        render={
          (props) =>
            userType === 'Superadmin' ? (
              !isAuthenticated ? (
                <Redirect to='/virtualsoft/admin/login' />
              ) : IsAdmin ? (
                <MainAppComponent
                  rest={rest}
                  Component={Component}
                  props={props}
                />
              ) : (
                <Redirect to='/404' />
              )
            ) : userType === 'Principal' || userType === 'Staff' ? (
              !isAuthenticated ? (
                <Redirect to='/login' />
              ) : IsAdmin === false ? (
                <MainAppComponent
                  rest={rest}
                  Component={Component}
                  props={props}
                />
              ) : (
                <Redirect to='/404' />
              )
            ) : splitLocation[1] === 'virtualsoft' &&
              splitLocation[2] === 'admin' ? (
              <Redirect to='/virtualsoft/admin/login' />
            ) : (
              <Redirect to='/login' />
            )

          // !isAuthenticated ? (
          //   <Redirect to='/login' />
          // ) : (
          //   <MainAppComponent rest={rest} Component={Component} props={props} />
          // )
        }
      />
      {/* /virtualsoft/admin */}
    </Fragment>
  );
};

PrivateRoute.propTypes = {
  Auth: PropTypes.object.isRequired,
  // loadUser: PropTypes.func.isRequired,
  // loadStockAlert: PropTypes.func.isRequired,
  // loadContactUs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, null)(PrivateRoute);
