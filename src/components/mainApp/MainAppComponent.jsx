import React, { Fragment, useEffect } from 'react';
import Header from '../layout/header/Header';
import Taptop from '../layout/tap-top/Taptop';
import Sidebar from '../layout/sidebar/Sidebar';
import Footer from '../layout/footer/Footer';
// import ThemeCustomizer from "../layout/themeCustomizer/ThemeCustomizer";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginLoader from '../layout/loader/LoginLoader';

import {
  loadUser,
  loadAdmin,
  logout,
  clearError,
} from '../../actions/authActions';

const MainAppComponent = ({
  Auth: { isAuthenticated, userType, user, loginLoading, error },
  loadUser,
  loadAdmin,
  logout,
  clearError,
  rest,
  Component,
  props,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      if (userType === 'Superadmin') {
        loadAdmin();
      } else {
        loadUser();
      }
    }
    if (error === 'Unauthorized') {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
      logout();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  return (
    <Fragment>
      <ToastContainer />
      {user === null && loginLoading ? (
        <LoginLoader />
      ) : (
        <Fragment>
          <Taptop />
          <div className='page-wrapper compact-wrapper' id='pageWrapper'>
            <Header rest={rest} />
            <div className='page-body-wrapper sidebar-icon'>
              <Sidebar rest={rest} />
              <div className='page-body'>
                <Component {...props} />
              </div>
              <Footer />
            </div>
          </div>
        </Fragment>
      )}
      {/* {loading && <Loader/> } */}

      {/* <ThemeCustomizer/> */}
    </Fragment>
  );
};

MainAppComponent.propTypes = {
  Auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadAdmin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, {
  loadUser,
  loadAdmin,
  logout,
  clearError,
})(MainAppComponent);
