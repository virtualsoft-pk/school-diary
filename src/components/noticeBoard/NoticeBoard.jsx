import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete, Eye } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
// import SectionFilter from './SectionFilter';
import Breadcrumb from '../../layout/breadcrumb';
// import UpdateSection from './UpdateSection';
import { useHistory } from 'react-router-dom';
import UpdateNotice from './UpdateNotice';

const NoticeBoard = () => {
    const data = [
        {
          title: "Holiday Festival Notice",
          body: "Donec eu metus ut ligula ultrices auctor. Fusce varius, nulla id faucibus semper, dui tellus vulputate mi, eget sollicitudin metus orci ac enim. Nullam pharetra lacus tellus, a luctus dui fringilla in. Phasellus feugiat semper enim, eu consectetur ex aliquam sit amet. Nulla eget euismod erat, vitae laoreet est. Phasellus quis dui quis ipsum molestie consectetur. In volutpat sodales diam ac maximus.",
          publishedDate: "2021-05-10",
          noticeDate: "2021-05-03",
          messageTo: [
            {student: false},
            {teacher: true},
            {parent: false},
          ]
        },
        {
          title: "A Notice to Students Regarding the Coronavirus",
          body: "Donec eu metus ut ligula ultrices auctor. Fusce varius, nulla id faucibus semper, dui tellus vulputate mi, eget sollicitudin metus orci ac enim. Nullam pharetra lacus tellus, a luctus dui fringilla in. Phasellus feugiat semper enim, eu consectetur ex aliquam sit amet. Nulla eget euismod erat, vitae laoreet est. Phasellus quis dui quis ipsum molestie consectetur. In volutpat sodales diam ac maximus.",
          publishedDate: "2021-05-10",
          noticeDate: "2021-05-03",
          messageTo: [
            {student: false},
            {teacher: false},
            {parent: false},
          ]
        },
        {
          title: "Parents Teacher Meeting",
          body: "Donec eu metus ut ligula ultrices auctor. Fusce varius, nulla id faucibus semper, dui tellus vulputate mi, eget sollicitudin metus orci ac enim. Nullam pharetra lacus tellus, a luctus dui fringilla in. Phasellus feugiat semper enim, eu consectetur ex aliquam sit amet. Nulla eget euismod erat, vitae laoreet est. Phasellus quis dui quis ipsum molestie consectetur. In volutpat sodales diam ac maximus.",
          publishedDate: "2021-05-10",
          noticeDate: "2021-05-03",
          messageTo: [
            {student: false},
            {teacher: false},
            {parent: false},
          ]
        },
      ];
      const tableColumns = [
        {
          name: 'Title',
          selector: 'title',
          width:"70%",
          sortable: true,
        //   center: true,
        },
        {
          name: 'Action',
          center: true,
          cell: (row) => (
            <div>
                <button
                className='btn view-button'
                onClick={() => viewToggle(row)}
              >
                <Eye/>
              </button>
              <button
                className='btn update-button'
                onClick={() => updateToggle(row)}
              >
                <Edit3 />
              </button>
              <button className='btn delete-button' onClick={() => onDelete(row)}>
                <Delete />
              </button>
            </div>
          ),
        },
      ];
    
      const onDelete = (data) => {
      };
    
      const [addNoticeModal, setAddNoticeModal] = useState(false);
    
      const [updateModal, setUpdateModal] = useState(false);
      const history = useHistory();
    //   const [data, setData] = useState(null);
    
      const updateToggle = (row) => {
        history.push("/communicate/notice-board/update-notice")
      };

      const viewToggle = (row)=>{
        history.push("/communicate/notice-board/view-notice");
      }
    
      const addNoticeToggle = () => setAddNoticeModal(!addNoticeModal);
    
      const AddSchoolRedirect = (redirect) => {
        history.push(redirect);
      };

      return (
        <Fragment>
    
          <Breadcrumb parent={null} title='Notice Board' />
          <Container fluid={true}>
            <Row>
              <Col sm={12} md={12}>
                <Card>
                  <CardBody>
                    <div className="card card-mb-faq xs-mt-search">
                    <Row className='justify-content-end'>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                        <Button
                          color='primary'
                          className='btn btn-sm'
                          onClick={() =>
                            AddSchoolRedirect(
                              `/communicate/notice-board/add-notice`
                            )
                          }
                        >
                          Post New Notice
                        </Button>
                      </Col>
                      <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                        {/* <SectionFilter /> */}
                      </Col>
                    </Row>
                    </div>
                    <DataTable
                      data={data}
                      columns={tableColumns}
                      striped={true}
                      center={true}
                      pagination={true}
                      persistTableHead
                      noHeader={true}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    };
    
export default NoticeBoard
