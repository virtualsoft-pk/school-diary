import React, { Fragment } from 'react';
import sad from '../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';
import { Container, Button, Media, Col } from 'reactstrap';
import { BACK_TO_HOME_PAGE } from '../../constant';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Error404 = ({ Auth: { userType } }) => {
  return (
    <Fragment>
      <div className='page-wrapper'>
        <div className='error-wrapper'>
          <Container>
            <Media body className='img-100' src={sad} alt='' />
            <div className='error-heading'>
              <h2 className='headline font-danger'>{'404'}</h2>
            </div>
            <Col md='8 offset-md-2'>
              <p className='sub-content'>
                {
                  'The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved.'
                }
              </p>
            </Col>

            <Link
              to={
                userType === 'Superadmin'
                  ? '/virtualsoft/admin/dashboard'
                  : '/default'
              }
            >
              <Button color='danger-gradien' size='lg'>
                {BACK_TO_HOME_PAGE}
              </Button>
            </Link>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};
Error404.propTypes = {
  Auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, null)(Error404);
