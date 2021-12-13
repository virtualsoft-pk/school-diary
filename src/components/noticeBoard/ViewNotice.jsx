import React, { useRef, Fragment, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';

const ViewNotice = () => {
 const data = [{
        title: "Holiday Festival Notice",
        body: "Donec eu metus ut ligula ultrices auctor. Fusce varius, nulla id faucibus semper, dui tellus vulputate mi, eget sollicitudin metus orci ac enim. Nullam pharetra lacus tellus, a luctus dui fringilla in. Phasellus feugiat semper enim, eu consectetur ex aliquam sit amet. Nulla eget euismod erat, vitae laoreet est. Phasellus quis dui quis ipsum molestie consectetur. In volutpat sodales diam ac maximus.",
        publishedDate: "2021-05-10",
        noticeDate: "2021-05-03",
        messageTo: [
          {student: false},
          {teacher: true},
          {parent: false},
        ]
      }]
    const [title, setTitle] = useState(data[0].title);
    const [noticeDate, setNoticeDate] = useState(data[0].noticeDate);
    const [publishDate, setPublishDate] = useState(data[0].publishedDate);
    const [body, setBody] = useState(data[0].body);
    const [messageTo, setMessageTo] = useState(data[0].messageTo)
 
    return (
    <Fragment>
        <Breadcrumb parent='Notice Board' parentLink="/communicate/notice-board" title='View Notice' />
        <Container fluid={true}>
        <Row>
            <Col sm={12} md={12}>
            <Card>
                <CardBody>
                    <Row>
                    <Col sm={12} md={8}>
                        <Row>
                        <Col sm={12} md={12}>
                        <label>
                            <h6>Title :</h6>
                        </label>
                        <span className='ml-2 counter'>
                            {title}
                        </span>
                        </Col>
                        <Col sm={12} md={12}>
                        <h6>Message</h6>
                        <p>{body}</p>
                    </Col>
                    </Row>
                    </Col>

                    <Col sm={12} md={4}>
                        <Row>
                        <Col sm="12" md="12">
                        <label>
                            <h6>Notice Date :</h6>
                        </label>
                        <span className='ml-2 counter'>
                            {noticeDate}
                        </span>
                        </Col>

                        <Col sm={12} md={12}>
                        <label>
                            <h6>Publish Date :</h6>
                        </label>
                        <span className='ml-2 counter'>
                            {publishDate}
                        </span>
                        </Col>
                        
                        <Col sm={12} md={12}>
                        <Label for="messageTo" ><h6>Message To: </h6></Label><br/>
                        {messageTo.map((person, index)=>(
                        <FormGroup key={index} style={{marginLeft:"22px"}}>
                        <Input type="checkbox" name={Object.keys(person)} value={Object.values(person)} defaultChecked={JSON.parse(Object.values(person))} disabled />
                        <Label for="vehicle1" >{Object.keys(person)}</Label>               
                        </FormGroup>
                        ))}
                        </Col>
                        </Row>
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

export default ViewNotice
