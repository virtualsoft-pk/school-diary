import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import HomeWorkFilter from './HomeWorkFilter';
import AddHomeWork from './AddHomeWork';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateHomeWork from './UpdateHomeWork';

const HomeWork = () => {
  const homeWork = [
    {
      className: 'OOP',
      section: '2243',
      subject: 'theory',
      homeWorkDate: '2-4-2021',
      submissionDate: '2-4-2021',
      createdBy: 'Zaid',
    },
    {
      className: 'OOP',
      section: '2243',
      subject: 'theory',
      homeWorkDate: '2-4-2021',
      submissionDate: '2-4-2021',
      createdBy: 'Zaid',
    },
  ];
  const tableColumns = [
    {
      name: 'Class Name',
      selector: 'className',
      sortable: true,
      center: true,
    },
    {
      name: 'Section',
      selector: 'section',
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
      name: 'Home Work Date',
      selector: 'homeWorkDate',
      sortable: true,
      center: true,
    },
    {
      name: 'Submission Date',
      selector: 'submissionDate',
      sortable: true,
      center: true,
    },
    {
      name: 'Created By',
      selector: 'createdBy',
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      width: '200px',
      cell: (row) => (
        <div>
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
    // deleteCategory(data.id);
  };

  const [homeWorkModal, setHomeWorkModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const homeWorkToggle = () => setHomeWorkModal(!homeWorkModal);

  return (
    <Fragment>
      {updateModal && (
        <UpdateHomeWork modal={updateModal} toggle={updateToggle} data={data} />
      )}

      <Breadcrumb parent={null} title='HomeWork' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      onClick={homeWorkToggle}
                      className='btn btn-sm'
                    >
                      Add Home Work
                    </Button>
                    <AddHomeWork
                      modal={homeWorkModal}
                      toggle={homeWorkToggle}
                    />
                  </Col>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <HomeWorkFilter />
                  </Col>
                </Row>

                <DataTable
                  data={homeWork}
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

export default HomeWork;
