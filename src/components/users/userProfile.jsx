import React, { useEffect, Fragment, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, Media } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Email,
  MarekjecnoMailId,
  DOB,
  DDMMYY,
  Designer,
  ContactUs,
  ContactUsNumber,
  LocationDetails,
  JOHANDIO,
  UserProfileDesc1,
  UserProfileDesc2,
  UserProfileDesc3,
  Comment,
  MarkJecno,
  Like,
  Follower,
  Following,
  Location,
} from '../../constant';

import TableLoader from '../layout/loader/TableLoader';

const UserProfile = ({ Auth: { user } }) => {
  const [url, setUrl] = useState();
  const [userImage, setUserImage] = useState();
  // useEffect(() => {
  //   if (user) {
  //     setUserImage(user.profile_image);
  //     console.log('inside....');
  //   }
  //   //eslint_disable_next_line
  // }, []);
  user && console.log('usersaff>>', user.profile_image);
  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };

  // email
  // name
  // phone
  // profile_image
  return (
    <Fragment>
      <Breadcrumb parent={null} title='User Profile' />
      <Container fluid={true}>
        <div className='user-profile'>
          {user && user !== null ? (
            <Row>
              {/* {setUserImage(user.profile_image)} */}
              <Col sm='12'>
                <Card className='card hovercard text-center'>
                  <CardHeader className='cardheader'></CardHeader>
                  <div className='user-image'>
                    <div className='avatar'>
                      <Media
                        body
                        alt=''
                        src={
                          user.profile_image
                            ? user.profile_image
                            : require('../../assets/images/user/7.jpg')
                        }
                        data-intro='This is Profile image'
                      />
                    </div>
                    <div
                      className='icon-wrapper'
                      data-intro='Change Profile image here'
                    >
                      <i className='icofont icofont-pencil-alt-5'>
                        <input
                          className='upload'
                          type='file'
                          onChange={(e) => readUrl(e)}
                        />
                      </i>
                    </div>
                  </div>
                  <div className='info'>
                    <Row>
                      <Col sm='6' lg='4' className='order-sm-1 order-xl-0'>
                        <Row>
                          <Col md='6'>
                            <div className='ttl-info text-left'>
                              <h6>
                                <i className='fa fa-envelope mr-2'></i> {Email}
                              </h6>
                              <span>{user.email}</span>
                            </div>
                          </Col>
                          <Col md='6'>
                            <div className='ttl-info text-left ttl-sm-mb-0'>
                              <h6>
                                <i className='fa fa-calendar'></i>   {DOB}
                              </h6>
                              <span>{DDMMYY}</span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm='12' lg='4' className='order-sm-0 order-xl-1'>
                        <div className='user-designation'>
                          <div className='title'>
                            <a target='_blank' href='#javascript'>
                              {user.name}
                            </a>
                          </div>
                          <div className='desc mt-2'>{Designer}</div>
                        </div>
                      </Col>
                      <Col sm='6' lg='4' className='order-sm-2 order-xl-2'>
                        <Row>
                          <Col md='6'>
                            <div className='ttl-info text-left ttl-xs-mt'>
                              <h6>
                                <i className='fa fa-phone'></i>   {ContactUs}
                              </h6>
                              <span>{user.phone}</span>
                            </div>
                          </Col>
                          <Col md='6'>
                            <div className='ttl-info text-left ttl-sm-mb-0'>
                              <h6>
                                <i className='fa fa-location-arrow'></i>   
                                {Location}
                              </h6>
                              <span>{LocationDetails}</span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          ) : (
            <TableLoader />
          )}
        </div>
      </Container>
    </Fragment>
  );
};

UserProfile.propTypes = {
  Auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {})(UserProfile);
