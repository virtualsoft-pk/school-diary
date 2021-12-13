import React, { Fragment, useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Breadcrumb from '../../layout/breadcrumb';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { Trash2 } from 'react-feather';

const AddTimeTable = () => {
  const classes = [
    {
        id: 1,
        name: "1",
    },
    {
        id: 2,
        name: "2",
    },
    {
        id: 3,
        name: "3",
    },
    {
        id: 4,
        name: "4",
    },
    {
        id: 5,
        name: "5",
    },
    {
        id: 6,
        name: "6",
    },     
    {
        id: 7,
        name: "7",
    },
    {
        id: 8,
        name: "8",
    },
    {
        id: 9,
        name: "9",
    },
    {
        id: 10,
        name: "10",
    },
  ]

  const sections = [
    {
        id: 1,
        name: "A",
    },
    {
        id: 2,
        name: "B",
    },
    {
        id: 3,
        name: "C",
    },
    {
        id: 4,
        name: "D",
    },
    {
        id: 5,
        name: "E",
    },
  ]

  const subjects = [
    {
        id: 1,
        name: "Math",
    },
    {
        id: 2,
        name: "Science",
    },
    {
        id: 3,
        name: "Urdu",
    },
    {
        id: 4,
        name: "English",
    },
    {
        id: 5,
        name: "Pak Studies",
    },
    {
      id: 6,
      name: "Islamiyat",
  },
  ]

  const teachers = [
    {
        id: 1,
        name: "Akram",
    },
    {
        id: 2,
        name: "Raza",
    },
    {
        id: 3,
        name: "Ali",
    },
    {
        id: 4,
        name: "Usman",
    },
    {
        id: 5,
        name: "Abbas",
    },
    {
      id: 6,
      name: "Irem",
  },
  ]

  const tableColumns = [
    {
      name: 'From',
      selector: 'from',
      sortable: true,
      center: true,
    },
    {
      name: 'To',
      selector: 'to',
      sortable: true,
      center: true,
    },
    {
        name: 'Subject',
        selector: 'subject',
        sortable: true,
        center: true,
    },
    {
    name: 'Teacher',
    selector: 'teacher',
    sortable: true,
    center: true,
    },
    {
      name: 'Action',
      center: true,
      width: '200px',
      cell: (row, index) => (
        <div>
          <button className='btn view-button' onClick={() => onRemoveImage(index)}>
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [from, setFrom] = useState((moment( moment("00:00", ["h:mm A"]).format("HH:mm"), "H:mm")));
  const [to, setTo] = useState((moment( moment("00:00", ["h:mm A"]).format("HH:mm"), "H:mm")));

  const [timeTable, setTimeTable] = useState([])

  const [errors, setErrors] = useState('');

  useEffect(() => {
    
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  const formValidate = () => {
    let errors = {};
    let isValid = true;

    if (selectedSubject === null ) {
      isValid = false;
      errors['selectedSubject'] = 'Please select subject.';
    }

    if (selectedTeacher === null ) {
      isValid = false;
      errors['selectedTeacher'] = 'Please select teacher.';
    }


    if (from === "" ) {
      isValid = false;
      errors['from'] = 'Please set start time.';
    }

    if (from !== '' && from !== undefined && from !== null) {
        if(typeof from === "string"){
            isValid = false;
            errors["from"] = "Please enter a valid time.";
        }
      }

    if (to === "" ) {
      isValid = false;
      errors['to'] = 'Please set end time.';
    }
      
    if (to !== '' && to !== undefined && to !== null) {
      if(typeof to === "string"){
          isValid = false;
          errors["to"] = "Please enter a valid time.";
      }
    }
   
    setErrors(errors);
    return isValid;
  };

  const createValidate = () => {
    let errors = {};
    let isValid = true;

    if (selectedClass === null ) {
      isValid = false;
      errors['selectedClass'] = 'Please select class.';
    }

    if (selectedSection === null ) {
      isValid = false;
      errors['selectedSection'] = 'Please select class section.';
    }

    if (timeTable.length === 0){
      isValid = false;
      errors['timeTable'] = 'Please add some data in table.';
    }
   
    setErrors(errors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValidate()) {
      const data = {
        from: moment(from).format("hh:mm A"),
        to: moment(to).format("hh:mm A"),
        subject: selectedSubject.name,
        teacher: selectedTeacher.name
      }
      setTimeTable([...timeTable , data])
      setSelectedSubject(null);
      setSelectedTeacher(null);
      setFrom((moment( moment("00:00", ["h:mm A"]).format("HH:mm"), "H:mm")));
      setTo((moment( moment("00:00", ["h:mm A"]).format("HH:mm"), "H:mm")));
    }
    else{
      setTimeout(() => {
        toast.error("Errors occur while adding new school");
      }, 200);
    }
  };

  const onRemoveImage = ( index) => {
    const resetTable = [...timeTable]; // copy of Original State
    resetTable.splice(index, 1);
    setTimeTable(resetTable);
  };

  const createTimetable = (e) => {
    e.preventDefault();
    if (createValidate()) {

      // const data = {
      //   from: moment(from).format("hh:mm A"),
      //   to: moment(to).format("hh:mm A"),
      //   subject: selectedSubject.name,
      //   teacher: selectedTeacher.name
      // }
      // setTimeTable([...timeTable , data])
    }
    else{
      setTimeout(() => {
        toast.error("Errors occur while adding new school");
      }, 200);
    }
  }

  let inputPropsToTIme = {
    placeholder: 'Lecture end at',
  };

  let inputPropsFromTIme = {
    placeholder: 'Lecture start at',
  };

  const onClassChange = (e) => {
    setSelectedSection(null)
    setSelectedSubject(null)
    setSelectedTeacher(null)
    const selectedClass = classes[e.target.value]; 
    setSelectedClass(selectedClass)
  };

  const onSectionChange = (e) => {
    const selectedSection = sections[e.target.value]; 
    setSelectedSection(selectedSection)
  };

  const onSubjectChange = (e) => {
    const selectedSubject = subjects[e.target.value]; 
    setSelectedSubject(selectedSubject)
  };

  const onTeacherChange = (e) => {
    const selectedTeacher = teachers[e.target.value]; 
    setSelectedTeacher(selectedTeacher)
  };

 return (
    <Fragment>
      <Breadcrumb
        parent='Timetable'
        parentLink='/timetable/timetable-listing'
        title='Add Timetable'
      />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                  <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='selectedClass'>Class</Label>
                        <Input
                          name='selectedClass'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={classes && selectedClass !== null ? classes.name : ''}
                        onChange={(e) => onClassChange(e)}
                    >
                        <option disabled value=''>
                        Select Class
                        </option>

                        {classes !== null &&
                        classes.map((x, index) => (
                            <option
                            key={x.id}
                            value={index}
                            >
                            {x.name}
                            </option>
                        ))}
                    </Input>

                        <div className='text-danger'>
                          {errors.selectedClass}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='selectedSection'>Section</Label>
                        <Input
                          name='selectedSection'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={sections && selectedSection !== null ? sections.name : ''}
                        onChange={(e) => onSectionChange(e)}
                    >
                        <option disabled value=''>
                        Select Section
                        </option>

                        {selectedClass !== null && sections !== null &&
                        sections.map((x, index) => (
                            <option
                            key={x.id}
                            value={index}
                            >
                            {x.name}
                            </option>
                        ))}
                    </Input>

                        <div className='text-danger'>
                          {errors.selectedSection}
                        </div>
                      </FormGroup>
                    </Col>
                    
                    <Col sm={12}>
                        <hr/>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='selectedSubject'>Subject</Label>
                        <Input
                          name='selectedSubject'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={subjects && selectedSubject !== null ? subjects.name : ''}
                        onChange={(e) => onSubjectChange(e)}
                    >
                        <option disabled value=''>
                        Select Subject
                        </option>

                        {selectedClass !== null && subjects !== null &&
                        subjects.map((x, index) => (
                            <option
                            key={x.id}
                            value={index}
                            >
                            {x.name}
                            </option>
                        ))}
                    </Input>

                        <div className='text-danger'>
                          {errors.selectedSubject}
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label htmlFor='selectedTeacher'>Teacher</Label>
                        <Input
                          name='selectedTeacher'
                          className='form-control digits'
                          style={{ width: '100%' }}
                          type='select'
                          value={teachers && selectedTeacher !== null ? teachers.name : ''}
                        onChange={(e) => onTeacherChange(e)}
                    >
                        <option disabled value=''>
                        Select Teacher
                        </option>

                        {selectedClass !== null && teachers !== null &&
                        teachers.map((x, index) => (
                            <option
                            key={x.id}
                            value={index}
                            >
                            {x.name}
                            </option>
                        ))}
                    </Input>

                        <div className='text-danger'>
                          {errors.selectedTeacher}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                    <FormGroup>
                        <Label className='form-label'>From</Label>
                        <Datetime
                        timeFormat={true}
                        dateFormat={false}
                        inputProps={inputPropsFromTIme}
                        value={from ? from : ""}
                        onChange={(time) => setFrom(time)}
                        />
                    </FormGroup>
                    <div className='text-danger'>{errors.from}</div>
                    </Col>

                    <Col sm={12} md={6}>
                    <FormGroup> 
                        <Label className='form-label'>To</Label>
                        <Datetime
                        timeFormat={true}
                        dateFormat={false}
                        inputProps={inputPropsToTIme}
                        value={to ? to : ""}
                        onChange={(time) => setTo(time)}
                        />
                    </FormGroup>
                    <div className='text-danger'>{errors.to}</div>
                    </Col>

                    <Col sm={12}>
                      <hr/>
                    </Col>
                    </Row>
                    <Button
                      className='btn btn-sm float-right'
                      color='primary'
                      type='submit'
                      >
                      Add to list
                    </Button>

                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <CardBody>
              <Row className="justify-content-between">
                <Col sm={12} md={12}>
                    <div className='media'>
                      <div className='media-body align-self-center'>
                        <h5 className='mt-0 user-name'>TimeTable</h5>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} sm={12}>
                      <hr />
                    </Col>
                <Col sm={12} md={4}>
                    <Row className="justify-content-between">
                        <Col sm={5}>
                        <h6>Class:</h6>
                        </Col>
                        <Col sm={5}>
                        {selectedClass !== null ? selectedClass.name : ""}
                        </Col>
                        <div className='text-danger'>
                          {errors.selectedClass}
                        </div>
                    </Row>
                    </Col>
                  <Col sm={12} md={4}>
                    <Row className="justify-content-between">
                        <Col sm={5}>
                        <h6>Section:</h6>
                        </Col>
                        <Col sm={5}>
                        {selectedSection !== null ? selectedSection.name : ""}
                        </Col>
                        <div className='text-danger'>
                          {errors.selectedSection}
                        </div>
                    </Row>
                  </Col>
                </Row>
              <DataTable
                  data={timeTable}
                  columns={tableColumns}
                  striped={true}
                  center={true}
                  pagination={true}
                  persistTableHead
                  noHeader={true}
                  />
              <div className='text-danger'>{errors.timeTable}</div>
                  <Button
                    className='btn btn-sm float-right'
                    color='primary'
                    type='submit'
                    onClick={createTimetable}
                    >
                    Create timetable
                  </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddTimeTable;
