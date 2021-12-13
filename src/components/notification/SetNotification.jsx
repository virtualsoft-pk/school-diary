import React, { Fragment, useState, useEffect } from 'react';
import Switch from 'react-switch';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import {
  loadNotification,
  updateNotification,
  clearError,
  clearMessage,
} from '../../actions/notificationAction';

const SetNotification = ({
  Notification: { notifications, error, message, notificationLoading },
  Auth: { userId },
  loadNotification,
  updateNotification,
  clearError,
  clearMessage,
}) => {
  const [grace_period, setGrace_period] = useState(false);
  const [one_week, setOne_week] = useState(false);
  const [one_month, setOne_month] = useState(false);

  useEffect(() => {
    loadNotification();

    if (message !== 'Updated Successfully') {
      if (notifications != null) {
        setGrace_period(notifications.grace_period === '1' ? true : false);
        setOne_month(notifications.one_month === '1' ? true : false);
        setOne_week(notifications.one_week === '1' ? true : false);
      }
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }

    // eslint-disable-next-line
  }, [message, error]);

  const onChange = (i) => {
    let notification;
    if (i === 'grace_period') {
      setGrace_period(!grace_period);
      notification = {
        grace_period: !grace_period ? '1' : '0',
        one_week: one_week ? '1' : '0',
        one_month: one_month ? '1' : '0',
        updated_by: userId,
        id: notifications.id,
      };
    } else if (i === 'one_week') {
      setOne_week(!one_week);
      notification = {
        grace_period: grace_period ? '1' : '0',
        one_week: !one_week ? '1' : '0',
        one_month: one_month ? '1' : '0',
        updated_by: userId,
        id: notifications.id,
      };
    } else if (i === 'one_month') {
      setOne_month(!one_month);
      notification = {
        grace_period: grace_period ? '1' : '0',
        one_week: one_week ? '1' : '0',
        one_month: !one_month ? '1' : '0',
        updated_by: userId,
        id: notifications.id,
      };
    }

    updateNotification(notification);
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Breadcrumb parent={null} title='Notification' />
        <Card>
          <CardBody className='p-0'>
            <div className='user-profile'>
              <div className='profile-img-style'>
                <ul>
                  <li>
                    <div className='media'>
                      <div className='media-body'>
                        <span>Grace period over schools</span>
                      </div>
                      <div className='align-self-center'>
                        <div className='float-sm-right'>
                          <label htmlFor='grace_period'>
                            <Switch
                              onChange={() => onChange('grace_period')}
                              checked={grace_period}
                              onColor='#f69f97'
                              onHandleColor='#ed4030'
                              handleDiameter={20}
                              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                              activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                              height={20}
                              width={40}
                              className='react-switch'
                              id='normal-switch'
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='media'>
                      <div className='media-body'>
                        <span>One week left schools</span>
                      </div>
                      <div className='align-self-center'>
                        <div className='float-sm-right'>
                          <label htmlFor='one_week'>
                            <Switch
                              onChange={() => onChange('one_week')}
                              checked={one_week}
                              onColor='#f69f97'
                              onHandleColor='#ed4030'
                              handleDiameter={20}
                              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                              activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                              height={20}
                              width={40}
                              className='react-switch'
                              id='normal-switch'
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='media'>
                      <div className='media-body'>
                        <span>A month left schools</span>
                      </div>
                      <div className='align-self-center'>
                        <div className='float-sm-right'>
                          <label htmlFor='one_month'>
                            <Switch
                              onChange={() => onChange('one_month')}
                              checked={one_month}
                              onColor='#f69f97'
                              onHandleColor='#ed4030'
                              handleDiameter={20}
                              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                              activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                              height={20}
                              width={40}
                              className='react-switch'
                              id='normal-switch'
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
SetNotification.propTypes = {
  Notification: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  loadNotification: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Notification: state.Notification,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  loadNotification,
  updateNotification,
  clearError,
  clearMessage,
})(SetNotification);
