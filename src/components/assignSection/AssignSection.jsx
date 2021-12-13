import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3 } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import SectionFilter from './AssignSectionFilter';
import AddSection from './AddAssignSection';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateSection from './UpdateAssignSection';
import {
  getAssignSection,
  clearError,
  clearMessage,
} from '../../actions/assignSectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';
import { getSection } from '../../actions/sectionAction';
import { getClass } from '../../actions/classAction';
const AssignSection = ({
  Auth: { user },
  AssignSection: {
    assignSectionLoading,
    assignSections,
    assignSectionFiltered,
    error,
    message,
  },
  getClass,
  getSection,
  clearError,
  clearMessage,
  getAssignSection,
}) => {
  useEffect(() => {
    if (user) {
      getAssignSection(user.school_id);
      getClass(user.school_id);
      getSection(user.school_id);
    }
    if (error !== null) {
      setTimeout(() => {
        toast.error(error);
      }, 200);
      clearError();
    }
    if (message !== null) {
      setTimeout(() => {
        toast.success(message);
      }, 200);
      clearMessage();
    }

    // eslint-disable-next-line
  }, [message, error, user]);

  const tableColumns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'Section Name',
      selector: 'label',
      sortable: true,
      center: true,
    },

    {
      name: 'Section',
      sortable: true,
      center: true,
      cell: (row) =>
        row.class_wise_sections.map((section, index) => (
          <span key={index}>
            {section.section_name}{' '}
            {index === row.class_wise_sections.length - 1 ? '' : ','}{' '}
          </span>
        )),
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
        </div>
      ),
    },
  ];

  const [sectionModal, setSectionModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);

  const updateToggle = (row) => {
    setUpdateModal(!updateModal);
    setData(row);
  };

  const sectionToggle = () => setSectionModal(!sectionModal);

  return (
    <Fragment>
      {updateModal && (
        <UpdateSection
          modal={updateModal}
          toggle={updateToggle}
          data={data}
          schoolId={user && user.school_id}
        />
      )}

      <Breadcrumb parent={null} title='AssignSection' />
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Row className='justify-content-end'>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <Button
                      color='primary'
                      onClick={sectionToggle}
                      className='btn btn-sm'
                    >
                      Assign Section
                    </Button>
                    <AddSection
                      modal={sectionModal}
                      toggle={sectionToggle}
                      schoolId={user && user.school_id}
                    />
                  </Col>
                  <Col sm={12} md={6} style={{ marginTop: '10px' }}>
                    <SectionFilter />
                  </Col>
                </Row>
                {assignSections !== null ? (
                  <TransitionGroup>
                    {assignSectionFiltered === null ? (
                      <DataTable
                        data={assignSections}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={assignSectionLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    ) : (
                      <DataTable
                        data={assignSectionFiltered}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={assignSectionLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    )}
                  </TransitionGroup>
                ) : (
                  <TableLoader />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

AssignSection.propTypes = {
  Auth: PropTypes.object.isRequired,
  AssignSection: PropTypes.object.isRequired,
  getAssignSection: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  getSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  AssignSection: state.AssignSection,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getAssignSection,
  getClass,
  getSection,
  clearError,
  clearMessage,
})(AssignSection);
