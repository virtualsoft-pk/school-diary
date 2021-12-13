import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Edit3, Delete } from 'react-feather';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import SectionFilter from './SectionFilter';
import AddSection from './AddSection';
import Breadcrumb from '../../layout/breadcrumb';
import UpdateSection from './UpdateSection';
import {
  getSection,
  clearError,
  clearMessage,
} from '../../actions/sectionAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';

const Section = ({
  Auth: { user },
  Section: { sectionLoading, sections, sectionFiltered, error, message },
  clearError,
  clearMessage,
  getSection,
}) => {
  useEffect(() => {
    if (user) {
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

      <Breadcrumb parent={null} title='Section' />
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
                      Add Section
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
                {sections !== null ? (
                  <TransitionGroup>
                    {sectionFiltered === null ? (
                      <DataTable
                        data={sections}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={sectionLoading}
                        progressComponent={<TableLoader />}
                        noHeader={true}
                        pagination={true}
                      />
                    ) : (
                      <DataTable
                        data={sectionFiltered}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        progressPending={sectionLoading}
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

Section.propTypes = {
  Auth: PropTypes.object.isRequired,
  Section: PropTypes.object.isRequired,
  getSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Section: state.Section,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getSection,
  clearError,
  clearMessage,
})(Section);
