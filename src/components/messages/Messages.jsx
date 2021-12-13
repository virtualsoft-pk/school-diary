import React, { useState, Fragment, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Eye, Trash } from 'react-feather';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ViewMessage from './ViewMessage';
import Breadcrumb from '../../layout/breadcrumb';
import {
  loadQueries,
  deleteQuery,
  clearError,
  clearMessage,
} from '../../actions/queriesAction';
import { toast } from 'react-toastify';
import TableLoader from '../layout/loader/TableLoader';

const Messages = ({
  Query: { queries, error, message, queryLoading },
  loadQueries,
  deleteQuery,
  clearError,
  clearMessage,
}) => {
  useEffect(() => {
    loadQueries();

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

    //eslint_disable_next_line
  }, [error, message]);

  const tableColumns = [
    {
      name: 'School Id',
      selector: 'school_id',
      sortable: true,
      center: true,
    },
    {
      name: 'School',
      selector: 'school',
      sortable: true,
      center: true,
    },

    {
      name: 'UserName',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true,
      center: true,
    },
    {
      name: 'Email',
      selector: 'email',
      width: '200px',

      sortable: true,
      center: true,
    },
    {
      name: 'Subject',
      width: '200px',

      selector: 'subject',
      sortable: true,
      center: true,
    },
    {
      name: 'Message',
      width: '200px',
      selector: 'message',
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      center: true,

      cell: (row) => (
        <p
          className={
            row.status === 'Resolved' ? 'f-12 font-success' : 'f-12 font-danger'
          }
        >
          {row.status === 'Resolved' ? 'resolved' : 'pending'}
        </p>
      ),
    },
    {
      name: 'Action',
      center: true,
      width: '200px',
      cell: (row) => (
        <div>
          <button
            className='btn view-button'
            onClick={() => onReadMessage(row)}
          >
            <Eye />
          </button>

          <button className='btn delete-button' onClick={() => onDelete(row)}>
            <Trash />
          </button>
        </div>
      ),
    },
  ];

  const [viewModal, setViewModal] = useState(false);
  const [messages, setMessages] = useState(null);

  const onReadMessage = (data) => {
    //   if (data.status == 1) {
    //     readMessage(data.id);
    //   }
    viewToggel();
    setMessages(data);
  };

  const viewToggel = () => {
    setViewModal(!viewModal);
  };

  const onDelete = (data) => {
    deleteQuery(data.id);
  };

  return (
    <Fragment>
      <Breadcrumb parent={null} title='Messages' />
      <Container fluid={true}>
        {viewModal && (
          <ViewMessage modal={viewModal} toggle={viewToggel} data={messages} />
        )}
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                {queries !== null ? (
                  <DataTable
                    data={queries}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination={true}
                    progressPending={queryLoading}
                    progressComponent={<TableLoader />}
                    noHeader={true}
                  />
                ) : (
                  <p className='no-data-found'>No messages found.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Messages.propTypes = {
  Query: PropTypes.object.isRequired,
  loadQueries: PropTypes.func.isRequired,
  deleteQuery: PropTypes.func.isRequired,
  // deleteContactUs: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Query: state.Query,
});

export default connect(mapStateToProps, {
  loadQueries,
  deleteQuery,
  clearError,
  clearMessage,
  // deleteContactUs,
})(Messages);
