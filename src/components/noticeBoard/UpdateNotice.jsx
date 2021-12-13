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

const UpdateNotice = () => {
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
    const [errors, setErrors] = useState('');
  
    const history = useHistory();

    const editorRef = useRef(null);
    const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };
    const UserMenuRedirect = (redirect) => {
      history.push(redirect);
    };
  
    const validate = () => {
      let errors = {};
      let isValid = true;

      if (title === '') {
        isValid = false;
        errors['title'] = 'Please enter first name.';
      }


        if (noticeDate !== ''|| noticeDate !== undefined || noticeDate !== null) {
         
            isValid = false;
            errors["noticeDate"] = "Please enter date of birth.";

        }
      if (noticeDate !== ''&& noticeDate !== undefined && noticeDate !== null) {
        if(typeof noticeDate === "string"){
          isValid = false;
          errors["noticeDate"] = "Please enter a valid date.";
      }
      }
      if (editorRef.current.getContent() === '') {
        isValid = false;
        errors['editorRef'] = 'Please enter description.';
      }

      setErrors(errors);
  
      return isValid;
    };

  
    const onSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
       
      }
    };

    let inputPropsNoticeDate = {
        placeholder: "Notice Date",
       };

    let inputPropsPublishDate = {
    placeholder: "Publish Date",
    };

    const getValue = (e, index)=>{
        const newObj = {[e.target.name]: !(JSON.parse(e.target.value))}
        let newArr = [...messageTo]; 
        newArr[index] =  newObj; 
      
        setMessageTo(newArr);
      }
      
    console.log("messagetoo", messageTo)
    return (
    <Fragment>
        <Breadcrumb parent='Notice Board' parentLink="/communicate/notice-board" title='Update Notice' />
        <Container fluid={true}>
        <Row>
            <Col sm={12} md={12}>
            <Card>
                <CardBody>
                <Form onSubmit={onSubmit}>
                    <Row>
                    <Col sm={12} md={8}>
                        <Row>
                        <Col sm={12} md={12}>
                            <FormGroup>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                name='title'
                                type='text'
                                className='form-control digits'
                                placeholder='Enter notice title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                            <div className='text-danger'>{errors.title}</div>
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={12}>
                    <FormGroup className='mb-3'>
                        <Label>Message</Label>
                        <input
                        id='my-file'
                        type='file'
                        name='my-file'
                        style={{ display: 'none' }}
                        />
                        <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={body}
                        apiKey='bc8vwn510rmzqwr2njr6biltdfwhc7cm3ctxtnn6nu9reqtd'
                        init={{
                            height: 500,
                            menubar: false,
                            image_title: true,
                            /* enable automatic uploads of images represented by blob or data URIs*/
                            automatic_uploads: true,
                            plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            ],

                            toolbar1:
                            'undo redo | formatselect | ' +
                            'bold italic forecolor backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat',

                            toolbar2: 'preview | link image media | help',

                            file_browser_callback_types: 'image',

                            file_picker_callback: function (
                            callback,
                            value,
                            meta
                            ) {
                            if (meta.filetype === 'image') {
                                var input = document.getElementById('my-file');
                                input.click();
                                input.onchange = function () {
                                var file = input.files[0];
                                const image = new FormData();
                                image.append('image', file);

                                var reader = new FileReader();

                                reader.onload = function (e) {
                                    callback(e.target.result, {
                                        alt: file.name,
                                    });
                                    // getImage(image).then((blogImage) => {
                                    //   callback(blogImage.data, {
                                    //     alt: file.name,
                                    //   });
                                    // });
                                };
                                reader.readAsDataURL(file);
                                };
                            }
                            },
                            // paste_data_images: true,
                            content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        />
                        <div className='text-danger'>{errors.editorRef}</div>
                    </FormGroup>
                    </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={4}>
                        <Row>
                        <Col sm="12" md="12">
                            <FormGroup>
                            <Label className="form-label">Notice Date</Label>
                            <Datetime
                                timeFormat={false}
                                dateFormat='YYYY-MM-DD'
                                inputProps={inputPropsNoticeDate}
                                value={noticeDate ? noticeDate : "YYYY-MM-DD"}
                                onChange={(date) => setNoticeDate(date)}
                            />
                            <div className="text-danger">{errors.noticeDate}</div>
                            </FormGroup>
                        </Col>

                        <Col sm={12} md={12}>
                            <FormGroup >
                            <Label className="form-label">Publish Date</Label>
                            <Datetime
                            timeFormat={false}
                            dateFormat='YYYY-MM-DD'
                            inputProps={inputPropsPublishDate}
                            value={publishDate ? publishDate : "YYYY-MM-DD"}
                            onChange={(date) => setPublishDate(date)}
                            />
                            </FormGroup>
                        </Col>
                        
                        <Col sm={12} md={12}>
                        <Label for="messageTo" >Message To</Label><br/>
                        {messageTo.map((person, index)=>(
                        <FormGroup key={index} style={{marginLeft:"22px"}}>
                        <Input type="checkbox" name={Object.keys(person)} value={Object.values(person)} defaultChecked={JSON.parse(Object.values(person))} onChange={(e)=>getValue(e, index)} />
                        <Label for="vehicle1" >{Object.keys(person)}</Label>               
                        </FormGroup>
                        ))}
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                    <br />
                    <Button
                    className='btn btn-sm float-right'
                    color='primary'
                    type='submit'
                    >
                    Submit
                    </Button>
                </Form>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </Container>
    </Fragment>
    );
  };

export default UpdateNotice
