import React, { Fragment } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import blogSingle from "../../assets/images/blog/blog-single.jpg";
import comment from "../../assets/images/blog/comment.jpg";
import nine from "../../assets/images/blog/9.jpg";
import four from "../../assets/images/blog/4.jpg";
import twelve from "../../assets/images/blog/12.png";
import fourteen from "../../assets/images/blog/14.png";
import {Button,Container,Row,Col,Media, Card, CardBody, FormGroup, Label, Input} from "reactstrap";
import {Comment,JolioMark} from "../../constant";

const UnblockForm = () => {
    return (
        <Fragment>
            <Breadcrumb parent={null} title="Unblock"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                        <div className="blog-single">
                            <div className="blog-box blog-details">
                                <Media className="img-fluid w-100" src={blogSingle} alt="blog-main" />
                            </div>
                        </div>
                        <Row>
                            <Col>
                            <div className='view-alert'>
                                <ul>
                                <Row>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>School Name:</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        MTB
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>Location :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        SadiqAbad
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>Branch Name :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        SadiqAbad
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>Postal Code :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        4337
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>Principal :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        Asif
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>No. of Students :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        1000
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm='6'>
                                    <li className='float-left'>
                                        <label>
                                        <h6>Due Amount :</h6>
                                        </label>
                                        <span className='ml-2 counter'>
                                        5000
                                        </span>
                                    </li>
                                    </Col>
                                    <Col sm={12}>
                                        <hr/>
                                    </Col>
                                </Row>
                                </ul>
                            </div>
                            </Col>
                        </Row>
                    <Row>
                        <Col sm={12} md={8} xl={5}>
                            <FormGroup className='form-row'>
                            <div className='col-sm-12 col-md-3 col-xl-3'>
                                <label className='col-form-label text-right'> <h6>Package :</h6></label>
                            </div>
                            <div className='col-sm-12 col-md-9 col-xl-9'>
                                <div className='input-group'>
                                <Input
                                    className='form-control digits'
                                    style={{ width: '100%' }}
                                    type='select'
                                    name='school'
                                    required
                                    // value={school ? school : ''}
                                    // onChange={onChangeSchool}
                                >
                                    <option disabled value=''>
                                    Select Package
                                    </option>
                                    <option key={1} value={'mtb'}>
                                    Silver
                                    </option>
                                    <option key={2} value={'punjab'}>
                                    Gold
                                    </option>
                                    <option key={2} value={'punjab'}>
                                    Platinum
                                    </option>
                                </Input>
                                </div>
                            </div>
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col sm='12' >
                        <div className='float-left'>
                            <label>
                            <h6>Package Price :</h6>
                            </label>
                            <span className='ml-2 counter'>
                            5000
                            </span>
                        </div>
                        </Col>
                        <Col sm='12' >
                        <div className='float-left'>
                            <label>
                            <h6>Total Amount :</h6>
                            </label>
                            <span className='ml-2 counter'>
                            20000
                            </span>
                        </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col sm={12} md={8} xl={5}>
                            <FormGroup className='form-row'>
                            <div className='col-sm-12 col-md-3 col-xl-4'>
                                <label className='col-form-label text-right'> <h6>Pay Amount :</h6></label>
                            </div>
                            <div className='col-sm-12 col-md-9 col-xl-8'>
                                <div className='input-group'>
                                <Input 
                                    className='form-control'
                                    type='text'
                                    name='userName'
                                    // value={userName ? userName : ''}
                                    placeholder='Enter Amount'
                                    // onChange={(e) => setUserName(e.target.value)}
                                    // required
                                    />
                                </div>
                            </div>
                            </FormGroup>
                        </Col>
                        </Row>
                        <hr />
                        <Button
                        type='submit'
                        className='btn btn-sm float-right'
                        color='primary'
                        // onClick={onSubmit}
                        >
                        Pay
                        </Button>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default UnblockForm;