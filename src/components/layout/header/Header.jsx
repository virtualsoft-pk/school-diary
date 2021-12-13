import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

const Header = (props) => {
  return (
    <Fragment>
      <div className='page-header'>
        <Row className='header-wrapper m-0'>
          <Leftbar />
          <Rightbar props= {props}/>
        </Row>
      </div>
    </Fragment>
  );
};

export default Header;
