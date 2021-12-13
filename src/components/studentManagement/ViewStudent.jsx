import React, { Fragment, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  Media,
  CardHeader,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Breadcrumb from '../../layout/breadcrumb';
import {Email,MarekjecnoMailId,BOD,DDMMYY,Designer,ContactUs,ContactUsNumber,LocationDetails,JOHANDIO,UserProfileDesc1,UserProfileDesc2,UserProfileDesc3,Comment,MarkJecno,Like,Follower,Following,Location} from '../../constant'

const ViewStudent = () => {
  const [studentName, setStudentName] = useState('Usama');
  const [rollNumber, setRollNumber] = useState(1542);
  const [schoolClass, setSchoolClass] = useState('6th');
  const [section, setSection] = useState('2nd');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setBateOfBirth] = useState('9-12-1998');
  const [category, setCategory] = useState('General');
  const [religion, setReligion] = useState('islam');
  const [contactNumber, setContactNumber] = useState('0305-674632');
  const [CNIC, setCNIC] = useState('3976-9734846');
  const [email, setEmail] = useState('usama@gmail.com');
  const [admissionDate, setAdmissionDate] = useState('9-10-2016');
  const [bloodGroup, setBloodGroup] = useState('B-');
  const [currentAddress, setCurrentAddress] = useState('123 Main Street, New York, NY 10030 is an example of an address.');
  const [permanentAddress, setPermanentAddress] = useState('123 Main Street, New York, NY 10030 is an example of an address.');

  //guardian

  const [guardianName, setGuardianName] = useState('Aziz');
  const [relation, setRelation] = useState('father');
  const [phoneNumber, setPhoneNumber] = useState('0234-5645345');
  const [guardianCNIC, setGuardianCNIC] = useState('3028-32332533');
  const [guardianEmail, setGuardianEmail] = useState('aziz@gmail.com');
  const [guardianAddress, setGuardianAddress] = useState('123 Main Street, New York, NY 10030 is an example of an address.');
  const [guardianOccupation, setGuardianOccupation] = useState('Doctor');
  const [guardianPhoto, setGuardianPhoto] = useState('');
  const [studentApp, setStudentApp] = useState('Activate');
  const [parentApp, setParentApp] = useState('Not Activate');

  return (
    <Fragment>
      <Breadcrumb parent='Student Management' parentLink="/student-management" title='Student Profile' />
      <Container fluid={true}>
      <div className="user-profile">
        <Row>
        <Col sm="12">
              <Card>
                  <CardHeader>
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">Student Details</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  </CardHeader>
                <div className="profile-img-style">
                  <Row>
                  <Col lg="3" xl="2">
                      <div id="aniimated-thumbnials-3"><a href="#javascript"><Media body className="img-fluid rounded" src={require("../../assets/images/user/16.png")} alt="gallery" /></a></div>
                      
                    </Col>
                    <Col lg="9" xl="10">
                    <ListGroup className="list-group-flush">
                       <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Student Name:</h6>
                          </Col>
                          <Col sm={7}>
                          {studentName}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                            <h6>Roll Number:</h6>
                          </Col>
                          <Col sm={7}>
                            {rollNumber}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Class:</h6>
                          </Col>
                          <Col sm={7}>
                          {schoolClass}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Section:</h6>
                          </Col>
                          <Col sm={7}>
                          {section}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Gender:</h6>
                          </Col>
                          <Col sm={7}>
                          {gender}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Date of Birth:</h6>
                          </Col>
                          <Col sm={7}>
                          {dateOfBirth}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Category:</h6>
                          </Col>
                          <Col sm={7}>
                          {category}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Religion:</h6>
                          </Col>
                          <Col sm={7}>
                          {religion}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Blood Group:</h6>
                          </Col>
                          <Col sm={7}>
                          {bloodGroup}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Contact Number:</h6>
                          </Col>
                          <Col sm={7}>
                          {contactNumber}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>CNIC:</h6>
                          </Col>
                          <Col sm={7}>
                          {CNIC}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Email:</h6>
                          </Col>
                          <Col sm={7}>
                          {email}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Admission Date:</h6>
                          </Col>
                          <Col sm={7}>
                          {admissionDate}
                          </Col>
                        </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Current Address:</h6>
                          </Col>
                          <Col sm={7}>
                          {currentAddress}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Permanent Address:</h6>
                          </Col>
                          <Col sm={7}>
                          {permanentAddress}
                          </Col>
                        </Row>
                        </ListGroupItem>

                    </ListGroup>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">Guardian Details</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  </CardHeader>
                <div className="profile-img-style">
                  <Row>
                    <Col lg="3" xl="2">
                      <div id="aniimated-thumbnials-3"><a href="#javascript"><Media body className="img-fluid rounded" src={require("../../assets/images/user/16.png")} alt="gallery" /></a></div>
                      
                    </Col>
                    <Col lg="9" xl="10">
                    <ListGroup className="list-group-flush">
                       <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Guardian Name:</h6>
                          </Col>
                          <Col sm={7}>
                          {guardianName}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Relation:</h6>
                          </Col>
                          <Col sm={7}>
                          {relation}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Email:</h6>
                          </Col>
                          <Col sm={7}>
                          {guardianEmail}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Phone Number:</h6>
                          </Col>
                          <Col sm={7}>
                          {phoneNumber}
                          </Col>
                        </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>CNIC:</h6>
                          </Col>
                          <Col sm={7}>
                          {guardianCNIC}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Guardian Occupation:</h6>
                          </Col>
                          <Col sm={7}>
                          {guardianOccupation}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Guardian Address:</h6>
                          </Col>
                          <Col sm={7}>
                          {guardianAddress}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Student App:</h6>
                          </Col>
                          <Col sm={7}>
                          {studentApp}
                          </Col>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                          <Col sm={5}>
                          <h6>Parent App:</h6>
                          </Col>
                          <Col sm={7}>
                          {parentApp}
                          </Col>
                        </Row>
                        </ListGroupItem>
                    </ListGroup>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
        </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default ViewStudent;
