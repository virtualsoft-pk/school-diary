import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../assets/images/dashboard/profile.jpg';
import {
  LogIn,
  Minimize,
  User,
  AlertOctagon,
  MessageSquare,
  ShoppingCart,
} from 'react-feather';
import { toast } from 'react-toastify';
import { LogOut, UserProfile } from '../../../constant';
import { titleCase } from 'title-case';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  logout,
  changeDarkMode,
  clearError,
  clearMessage,
} from '../../../actions/authActions';

const Rightbar = ({
  Auth: { user, dark_mode, error, message },
  logout,
  clearError,
  clearMessage,
  changeDarkMode,
  props,
}) => {
  useEffect(() => {
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

    if (dark_mode === 'dark-only') {
      setMoonlight(true);
      document.body.className = 'dark-only';
    }

    // eslint-disable-next-line
  }, [error, message]);

  const [moonlight, setMoonlight] = useState(false);

  const [stockAlert, setStockAlert] = useState(false);
  const [stockAlertData, setStockAlertData] = useState(null);
  const [viewAlertModal, setViewAlertModal] = useState(false);

  const [chatDropDown, setChatDropDown] = useState(false);
  const [contactUsData, setContactUsData] = useState(null);
  const [viewMessageModal, setViewMessageModal] = useState(false);

  const [userOrders, setUserOrders] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [viewOrderModal, setViewOrderModal] = useState(false);

  const history = useHistory();

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.className = 'light';
      changeDarkMode('light');
    } else {
      setMoonlight(!light);
      document.body.className = 'dark-only';
      changeDarkMode('dark-only');
    }
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <div className='nav-right col-8 pull-right right-header p-0'>
        <ul className='nav-menus'>
          <li>
            <div className='mode' onClick={() => MoonlightToggle(moonlight)}>
              <i
                className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}
              ></i>
            </div>
          </li>

          <li className='maximize'>
            <a
              className='text-dark'
              href={props.rest.pathname}
              onClick={goFull}
            >
              <Minimize />
            </a>
          </li>

          <li className='profile-nav onhover-dropdown p-0'>
            <div className='media profile-media'>
              <img
                className='b-r-10'
                src={
                  user
                    ? user.profile_image !== '' && user.profile_image !== null
                      ? user.profile_image
                      : man
                    : man
                }
                alt=''
              />
              <div className='media-body'>
                <span>{user ? titleCase(user.name) : 'nothing'}</span>
                <p>
                  <i className='middle fa fa-angle-down'></i>
                </p>
              </div>
            </div>
            <ul className='profile-dropdown onhover-show-div'>
              <li
                onClick={() =>
                  UserMenuRedirect(`/virtualsoft/admin/settings/user-profile`)
                }
              >
                <User />
                <span>{UserProfile}</span>
              </li>
              <li onClick={onLogout}>
                <LogIn />
                <span>{LogOut}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

Rightbar.propTypes = {
  Auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  changeDarkMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  logout,
  clearError,
  clearMessage,
  changeDarkMode,
})(Rightbar);
