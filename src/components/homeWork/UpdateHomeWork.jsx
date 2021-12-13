import React, { useState, Fragment, useRef } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
// import { titleCase } from 'title-case';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Editor } from '@tinymce/tinymce-react';
import Dropzone from 'react-dropzone';

const UpdateHomeWork = ({ data, modal, toggle }) => {
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [homeWorkDate, setHomeWorkDate] = useState(moment(new Date()));
  const [submissionDate, setSubmissionDate] = useState(moment(new Date()));
  const [selectedExcelFile, setSelectedExcelFile] = useState([]);
  const editorRef = useRef(null);

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (selectedClass.length === 0) {
      isValid = false;
      errors['selectedClass'] = 'Please enter class.';
      errors['selectedSection'] = 'Please enter section.';
      errors['selectedSubject'] = 'Please enter subject.';
    }

    if (selectedSection.length === 0) {
      isValid = false;
      errors['selectedSection'] = 'Please enter section.';
      errors['selectedSubject'] = 'Please enter subject.';
    }

    if (selectedSubject.length === 0) {
      isValid = false;
      errors['selectedSubject'] = 'Please enter subject.';
    }

    if (
      homeWorkDate !== '' &&
      homeWorkDate !== undefined &&
      homeWorkDate !== null
    ) {
      if (typeof homeWorkDate === 'string') {
        isValid = false;
        errors['homeWorkDate'] = 'Please enter a valid date.';
      }
    }

    if (
      submissionDate !== '' &&
      submissionDate !== undefined &&
      submissionDate !== null
    ) {
      if (typeof submissionDate === 'string') {
        isValid = false;
        errors['submissionDate'] = 'Please enter a valid date.';
      }
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

  const onUpdate = (e) => {
    e.preventDefault();

    if (validate()) {
      // Clear fields

      setSelectedClass([]);
      setSelectedSection([]);
      setSelectedSubject([]);
      setHomeWorkDate('');
      setSubmissionDate('');

      toggle();
    }
  };

  const homeWorks = [
    {
      className: 'MTB',
      section: 'SDK',
      subject: 'Sadiqabad',

      homeWorkDate: '2021-02-23',
      submissionDate: '2021-02-23',
      createdBy: '4037',
    },
    {
      className: 'Punjab',
      section: 'RYK',
      subject: 'RYK',
      homeWorkDate: '2021-07-05',
      submissionDate: '2021-07-05',
      createdBy: '4337',
    },
    {
      className: 'MTB',
      section: 'SDK',
      subject: 'Sadiqabad',
      homeWorkDate: '2020-10-13',
      submissionDate: '2020-10-13',
      createdBy: '4037',
    },
  ];

  let inputProps = {
    placeholder: 'Date of birth',
  };

  //   const getImage = (image) => {
  //     return new Promise((resolve, reject) => {
  //       const res = uploadFile(image);
  //       resolve(res);
  //     });
  //   };

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

  const onClassChange = (className) => {
    setSelectedClass(className);
  };

  const onSectionChange = (section) => {
    setSelectedSection(section);
  };
  const onSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Update Home Work
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='class'>Select Class</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='className'
                  options={homeWorks}
                  placeholder='Select Class....'
                  onChange={(data) => onClassChange(data)}
                />
              </FormGroup>
              <div className='text-danger'>{errors.selectedClass}</div>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='section'>Select Section</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='section'
                  options={homeWorks}
                  placeholder='Select Section....'
                  onChange={(data) => onSectionChange(data)}
                />
                <div className='text-danger'>{errors.selectedSection}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor='subject'>Select Subject</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='subject'
                  options={homeWorks}
                  placeholder='Select Subject....'
                  onChange={(data) => onSubjectChange(data)}
                />
                <div className='text-danger'>{errors.selectedSubject}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label className='form-label'>Home Work Date</Label>
                <Datetime
                  timeFormat={false}
                  dateFormat='YYYY-MM-DD'
                  inputProps={inputProps}
                  value={homeWorkDate ? homeWorkDate : 'YYYY-MM-DD'}
                  onChange={(date) => setHomeWorkDate(date)}
                />
                <div className='text-danger'>{errors.homeWorkDate}</div>
              </FormGroup>
            </Col>

            <Col sm={12} md={6}>
              <FormGroup>
                <Label className='form-label'>Submission Date</Label>
                <Datetime
                  timeFormat={false}
                  dateFormat='YYYY-MM-DD'
                  inputProps={inputProps}
                  value={submissionDate ? submissionDate : 'YYYY-MM-DD'}
                  onChange={(date) => setSubmissionDate(date)}
                />
                <div className='text-danger'>{errors.submissionDate}</div>
              </FormGroup>
            </Col>
            <Col sm={12} md={12}>
              <Label htmlFor='attachment'>Upload File (Optional)</Label>

              <Dropzone onDrop={(file) => handleFileSelect(file)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p style={{ padding: '0px 15px', textAlign: "center" }}>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    <em style={{ padding: '0px 15px', textAlign: "center" }}>
                      (Only .xlsx, .xlsm, .csv, slk, .html, .dif and .xltx file
                      are acceptable)
                    </em>
                  </div>
                )}
              </Dropzone>
              <div className='text-danger'>{errors.selectedExcelFile}</div>

              {selectedExcelFile &&
                selectedExcelFile !== null &&
                selectedExcelFile.length > 0 && (
                  <Col sm={12} md={12}>
                    <h6>Selected files</h6>
                    <ListGroup className="list-group-flush" style={{marginBottom:"20px"}}>
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
                  </Col>
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
                  onInit={(evt, editor) => (editorRef.current = editor)}
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

                    file_picker_callback: function (callback, value, meta) {
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
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => onUpdate(e)}
            color='primary'
            className='btn btn-sm'
          >
            Update
          </Button>
          <Button color='secondary' className='btn btn-sm' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateHomeWork;
