import React, { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Download } from 'react-feather';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TransitionGroup } from 'react-transition-group';
import {
  getEmailLog,
  clearError,
  clearMessage,
} from '../../actions/emailLogAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLoader from '../layout/loader/TableLoader';
import { toast } from 'react-toastify';
import moment from 'moment';

const EmailLog = ({
  EmailLog: { emailLogLoading, emailLogs, emailLogFiltered, error, message },
  clearError,
  clearMessage,
  getEmailLog,
}) => {
  const history = useHistory();

  const EmailLogRedirect = (redirect) => {
    history.push(redirect);
  };

  useEffect(() => {
    getEmailLog();

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
  }, [message, error]);

  const download = (data) => {
    // url: 'https://source.unsplash.com/random/500x500',
    axios({
      url: 'https://docs.google.com/document/d/0Bw1byoFQVj-xR2FXMVJ2RHgwcFEzVjRFU2JLaXpaZ1lqYUpB/edit?usp=sharing&ouid=111995446723826285812&resourcekey=0-gn8IbmaDM87v7Z91vKxDGg&rtpof=true&sd=true',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dummy');
      document.body.appendChild(link);
      link.click();
    });
  };

  //   title: 'Event',
  //   date: '2021-04-05',
  //   emailSms: 'Ali@gmail.com',
  //   groupPerson: 'Teacher, Student, Guardian',

  //   class: "0"
  // email: "1"
  // group: ""
  // id: "1"
  // individual: "1"
  // sms: "0"
  const tableColumns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      center: true,
    },
    {
      name: 'Date',

      sortable: true,
      center: true,
      cell: (row) => <>{moment(row.timestamp).format('YYYY-MM-DD')}</>,
    },
    {
      name: 'Email/SMS',
      selector: 'emailSms',
      sortable: true,
      center: true,
    },
    {
      name: 'Group/Person',
      selector: 'groupPerson',
      sortable: true,
      center: true,
    },
    {
      name: 'Attachement',
      center: true,
      cell: (row) => (
        <div>
          {/* <button className='btn view-button' onClick={() => download(row)}>
            <Download />
          </button> */}
          <a
            href='https://my.kfueit.edu.pk/uploads/downloads/M-41.docx'
            download=''
          >
            <Download />
          </a>
        </div>
      ),
    },
  ];
  {
    /* <a
            // href='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            href='/home/ahmad256/Ahmad/Virtual Soft/react/theme/src/components/cosc18111167_Assignment1.pdf'
            // target='_blank'
            download
          >
            <Eye />
          </a> */
  }
  {
    /* <Link
            // href='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

to='/cosc18111167_Assignment1.pdf'
            target='/cosc18111167_Assignment1.pdf'
            download='cosc18111167_Assignment1.pdf'
          >
            <Eye />
          </Link> */
  }
  {
    /* <button className='btn view-button' onClick={() => viewToggel(row)}>
            <Eye />target="_blank"
          </button> */
  }

  const [viewModal, setViewModal] = useState(false);
  const [student, setStudent] = useState(null);

  const viewToggel = (data) => {
    EmailLogRedirect(`${process.env.PUBLIC_URL}/dashboards/EmailLog/schools`);
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Breadcrumb parent={null} title='Email/SMS Log' />
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row>
                    <Col sm={12} md={3}></Col>
                  </Row>
                  {emailLogs !== null ? (
                    <DataTable
                      data={emailLogs}
                      columns={tableColumns}
                      striped={true}
                      center={true}
                      progressPending={emailLogLoading}
                      progressComponent={<TableLoader />}
                      noHeader={true}
                      pagination={true}
                    />
                  ) : (
                    <TableLoader />
                  )}
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
EmailLog.propTypes = {
  EmailLog: PropTypes.object.isRequired,
  getEmailLog: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  EmailLog: state.EmailLog,
});

export default connect(mapStateToProps, {
  getEmailLog,
  clearError,
  clearMessage,
})(EmailLog);
