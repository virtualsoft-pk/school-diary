import React, { Fragment } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ Auth: { userType }, title, parent, parentLink }) => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div className='page-title'>
          <Row>
            <Col xs='6'>
              <h3>{title}</h3>
            </Col>
            <Col xs='6'>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link
                    to={
                      userType === 'Superadmin'
                        ? `/virtualsoft/admin/dashboard`
                        : '/default'
                    }
                  >
                    <Home />
                  </Link>
                </BreadcrumbItem>
                {parent !== null && (
                  <BreadcrumbItem>
                    <Link to={parentLink}>{parent}</Link>
                  </BreadcrumbItem>
                )}
                <BreadcrumbItem active>{title}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

Breadcrumbs.propTypes = {
  Auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, {})(Breadcrumbs);
