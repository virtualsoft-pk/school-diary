import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import CollectFeeFilter from './CollectFeeFilter';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateCollectFeeModal from './UpdateCollectFeeModal';
import CriteriaFilter from './CriteriaFilter';

const CollectFees = () => {
  const colectFee = [
    {
      className: 'OOP',
      section: '2243',
      admissionNo: '5436',
      studentName: 'Zaid Aziz',
      fatherName: 'Muhammad Aziz',
      DOB: '2021-02-04',
      phone: '0875-4783522',
    },
    {
      className: 'OOP',
      section: '2243',
      admissionNo: '5436',
      studentName: 'Zaid Aziz',
      fatherName: 'Muhammad Aziz',
      DOB: '2021-02-04',
      phone: '0875-4783522',
    },
  ];
  const tableColumns = [
    {
      name: 'Class',
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
      name: 'Admission No.',
      selector: 'admissionNo',
      sortable: true,
      center: true,
    },
    {
      name: 'Student Name',
      selector: 'studentName',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'Father Name',
      selector: 'fatherName',
      width: '150px',
      sortable: true,
      center: true,
    },
    {
      name: 'DOB',
      selector: 'DOB',
      width: '115px',

      sortable: true,
      center: true,
    },
    {
      name: 'Phone',
      selector: 'phone',
      width: '150px',
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
        <UpdateCollectFeeModal
          modal={updateModal}
          toggle={updateToggle}
          data={data}
        />
      )}

      <Breadcrumb parent={null} title='Collect Fees' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={8} style={{ marginTop: '10px' }}>
                    <CriteriaFilter />
                  </Col>

                  <Col sm={12} md={4} style={{ marginTop: '10px' }}>
                    <CollectFeeFilter />
                  </Col>
                </Row>

                <DataTable
                  style={{ marginTop: '10px' }}
                  data={colectFee}
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

export default CollectFees;
