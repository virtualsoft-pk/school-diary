import React, { useState, Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import { User , X, Bell, Lock, FileText, Info, LogIn} from 'react-feather';

const Settings = () => {
      const [userId, setUserId] = useState(null);
    
      const [addUserModal, setAddUserModal] = useState(false);
    

      return (
        <Fragment>
          <Breadcrumb parent={null} title='Settings' />
          <Container fluid={true}>
            <Row>
              <Col sm={12} md={12}>
                <Card>
                  <CardBody>
                    <Row style={{ height: '100%' }}>
                          <Col sm={12} md={4}>
                            <div >
                              <ul>
                              <li className="settings">
                                <a  href="!#">
                                    <User/>
                                    <span>
                                     My Profile
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <X/>
                                    <span>
                                     Block List
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <Bell/>
                                    <span>
                                     Notifications
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <Lock/>
                                    <span>
                                     Change Password
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <FileText/>
                                    <span>
                                     Terms & Conditions
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <Info/>
                                    <span>
                                     About Us
                                    </span>
                                </a>
                            </li>
                            <li className="settings">
                                <a  href="!#">
                                    <LogIn/>
                                    <span>
                                     Logout
                                    </span>
                                </a>
                            </li>
                             </ul>   
                             
                            </div>
                          </Col>
    
                      </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    };
    
    
export default Settings
