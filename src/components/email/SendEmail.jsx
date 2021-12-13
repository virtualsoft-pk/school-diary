import React, { Fragment, useState, useRef } from 'react';
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
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import { DateOfBirth, PhoneNumber, EmailAddress } from '../../constant';
import { Editor } from '@tinymce/tinymce-react';

import Dropzone from 'react-dropzone';

const SendEmail = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedExcelFile, setSelectedExcelFile] = useState([]);
  const [messageTo, setMessageTo] = useState([
    { student: false },
    { teacher: false },
    { parent: false },
  ]);

  const [errors, setErrors] = useState('');

  const history = useHistory();

  const EmailLogRedirect = (redirect) => {
    history.push(redirect);
  };
  const [description, setDescription] = useState('');

  //   const getImage = (image) => {
  //     return new Promise((resolve, reject) => {
  //       const res = uploadFile(image);
  //       resolve(res);
  //     });
  //   };
  const getValue = (e, index) => {
    const newObj = { [e.target.name]: !JSON.parse(e.target.value) };
    let newArr = [...messageTo];
    newArr[index] = newObj;

    setMessageTo(newArr);
  };

  const editorRef = useRef(null);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (title === '') {
      isValid = false;
      errors['title'] = 'Please enter title.';
    }

    if (message === '') {
      isValid = false;
      errors['message'] = 'Please enter message.';
    }

    if (editorRef.current.getContent() === '') {
      isValid = false;
      errors['editorRef'] = 'Please enter description.';
    }

    if (
      selectedExcelFile ||
      selectedExcelFile !== null ||
      selectedExcelFile.length > 0
    ) {
      isValid = false;
      errors['selectedExcelFile'] = 'Please chosse documents.';
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  const onRemoveFile = (file, index) => {
    const myNewFiles = [...selectedExcelFile]; // copy of Original State
    myNewFiles.splice(index, 1);
    setSelectedExcelFile(myNewFiles);
  };

  const handleFileSelect = (acceptedFile) => {
    acceptedFile.map((file) => {
      setSelectedExcelFile((selectedExcelFile) => [...selectedExcelFile, file]);
    });
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Send Email/SMS' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col sm={12} md={8}>
                      <Col sm={12} md={12}>
                        <FormGroup>
                          <Label htmlFor='title'>Title</Label>
                          <Input
                            name='title'
                            type='text'
                            className='form-control digits'
                            placeholder='Enter title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          ></Input>
                          <div className='text-danger'>{errors.title}</div>
                        </FormGroup>
                      </Col>

                      <Col sm='12' md='12'>
                        <Label htmlFor='attachment'>Attachment</Label>

                        <Dropzone onDrop={(file) => handleFileSelect(file)}>
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'dropzone' })}>
                              <input {...getInputProps()} />
                              <p style={{ padding: '0px 15px', textAlign: "center" }}>
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                              <em style={{ padding: '0px 15px', textAlign: "center" }}>
                                (Only .xlsx, .xlsm, .csv, slk, .html, .dif and
                                .xltx file are acceptable)
                              </em>
                            </div>
                          )}
                        </Dropzone>
                        <div className='text-danger'>
                          {errors.selectedExcelFile}
                        </div>

                        {selectedExcelFile &&
                          selectedExcelFile !== null &&
                          selectedExcelFile.length > 0 && (
                            <>
                              <h6>Selected files</h6>
                              <ListGroup className="list-group-flush" style={{marginBottom: "20px"}}>
                              {selectedExcelFile.map((file, i) => (
                               <Fragment key={i}>
                              <ListGroupItem>
                                <Row className="justify-content-between">
                                  <Col sm={9}>
                                  {file.path}{' '}
                                  </Col>
                                  <Col sm={3}>
                                  <span
                                     onClick={() => onRemoveFile(file, i)}
                                    className='file-close'
                                  >
                                    &times;
                                  </span>
                                  </Col>
                                </Row>
                                </ListGroupItem>
                              </Fragment>
                              ))}
                              </ListGroup>
                            </>
                          )}
                      </Col>

                      <Col sm={12} md={12}>
                        <FormGroup className='mb-3'>
                          <Label>Description</Label>
                          <input
                            id='my-file'
                            type='file'
                            name='my-file'
                            style={{ display: 'none' }}
                          />
                          <Editor
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            initialValue=''
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
                                  var input =
                                    document.getElementById('my-file');
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
                                      //   getImage(image).then((blogImage) => {
                                      //     callback(blogImage.data, {
                                      //       alt: file.name,
                                      //     });
                                      //   });
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
                    </Col>

                    <Col sm={12} md={4}>
                      <Col sm={12} md={12}>
                        <Label for='messageTo'>Message To</Label>
                        <br />
                        {messageTo.map((person, index) => (
                          <FormGroup key={index} style={{ marginLeft: '22px' }}>
                            <Input
                              className='checkbox_animated'
                              type='checkbox'
                              name={Object.keys(person)}
                              value={Object.values(person)}
                              defaultChecked={JSON.parse(Object.values(person))}
                              onChange={(e) => getValue(e, index)}
                            />
                            <Label for={Object.keys(person)}>
                              {Object.keys(person)}
                            </Label>
                          </FormGroup>
                        ))}
                      </Col>

                      {/* <Col sm={12} md={12}>
                        <Label htmlFor='messageTo'>Message To:</Label>

                        <FormGroup style={{ marginLeft: '22px' }}>
                          <ul>
                            {reciverList.map((reciver, index) => {
                              return (
                                <li key={index}>
                                  <div>
                                    <div>
                                      <Input
                                        type='checkbox'
                                        id={`message-to-${index}`}
                                        name={Object.keys(reciver)}
                                        value={Object.keys(reciver)}
                                        checked={
                                          checkedState[index]
                                            ? Object.values(reciver)
                                            : false
                                        }
                                        onChange={() =>
                                          handleOnChange(
                                            index,
                                            Object.keys(reciver)
                                          )
                                        }
                                      />
                                      <Label htmlFor={`message-to-${index}`}>
                                        {Object.keys(reciver)}
                                      </Label>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul> */}

                      {/* <div className='text-danger'>{errors.title}</div> */}
                      {/* </FormGroup> */}
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

export default SendEmail;
