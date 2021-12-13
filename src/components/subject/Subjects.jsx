import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import SubjectFilter from './SubjectFilter';
import AddSubject from './AddSubject';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateSubject from './UpdateSubject';

const Subjects = () => {
  const subjects = [
    {
      subjectName: 'OOP',
      subjectCode: '2243',
      subjectType: 'theory',
    },
    {
      subjectName: 'OOP',
      subjectCode: '2243',
      subjectType: 'theory',
    },
  ];
  const tableColumns = [
    {
      name: 'Subject Name',
      selector: 'subjectName',
      sortable: true,
      center: true,
    },
    {
      name: 'Subject Code',
      selector: 'subjectCode',
      sortable: true,
      center: true,
    },
    {
      name: 'Subject Type',
      selector: 'subjectType',
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
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

  const [subjectModal, setSubjectModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const subjectToggle = () => setSubjectModal(!subjectModal);

  return (
    <Fragment>
      {updateModal && (
        <UpdateSubject modal={updateModal} toggle={updateToggle} data={data} />
      )}

      <Breadcrumb parent={null} title='Subjects' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      onClick={subjectToggle}
                      className='btn btn-sm'
                    >
                      Add Subject
                    </Button>
                    <AddSubject modal={subjectModal} toggle={subjectToggle} />
                  </Col>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <SubjectFilter />
                  </Col>
                </Row>

                <DataTable
                  data={subjects}
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

export default Subjects;
