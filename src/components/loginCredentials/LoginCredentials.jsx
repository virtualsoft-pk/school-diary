import React, { Fragment, useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Button, 
  Form ,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody
  
} from 'reactstrap';
import axios from "axios"
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Breadcrumb from '../../layout/breadcrumb';

const LoginCredentials = () => {
    const role = [
        { role: "Admin"} ,
        { role: "Teacher"} ,
        { role: "Student"} ,
    ]
    const person = [
        {
          name: 'Zaid'
        },
        {
          name: 'Asif'
        },
        {
          name: 'Ali'
        },
      ];
    const [selectedRole, setSelectedRole] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState([]);
    const onRoleChange = (role)=>{
        setSelectedRole(role)
    }
    const onPersonChange = (person)=>{
        setSelectedPerson(person)
    }
    const onSubmit = (e)=>{
        e.prevent.default()
    }
    return (
        <Fragment>
        <Breadcrumb parent={null} title='Login Credentials' />
        <Container fluid={true}>
        <Card>
            <CardBody>
            <Row>
                <Col sm='12' sm='12'>
                <div className='date-picker'>
                <Form onSubmit={onSubmit} className='theme-form'>
                    <Row >
                    <Col sm={12} md={4}>
                    <FormGroup>
                    <Label htmlFor='role'>Select Role</Label>
                    <Typeahead
                        id='multiple-typeahead'
                        clearButton
                        labelKey='role'
                        options={role}
                        placeholder='Select Role....'
                        onChange={(data) => onRoleChange(data)}
                    />
                </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                    <FormGroup>
                    <Label htmlFor='person'>Select Person</Label>
                    <Typeahead
                        id='multiple-typeahead'
                        clearButton
                        labelKey='name'
                        options={person}
                        placeholder='Select Person....'
                        onChange={(data) => onPersonChange(data)}
                    />
                    </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                    <Button
                      className='btn btn-sm float-right'
                      color='primary'
                      type='submit'
                    >
                      Send Credentials
                    </Button>
                    </Col>
                    </Row>
                </Form>
                </div>
                </Col>
            </Row>
        </CardBody>
        </Card>
        </Container>
        </Fragment>
    )
}

export default LoginCredentials
