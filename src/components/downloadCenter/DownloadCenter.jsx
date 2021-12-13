import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Download } from 'react-feather';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DownloadCenterFilter from './DownloadCenterFilter';

const DownloadCenter = () => {
  const history = useHistory();

  const DownloadCenterRedirect = (redirect) => {
    history.push(redirect);
  };

  const downloadCenter = [
    {
      contentTitle: 'Logo',
      date: '2021-04-05',
    },
    {
      contentTitle: 'Event',
      date: '2021-04-05',
    },
    {
      contentTitle: 'List',
      date: '2021-04-05',
    },
  ];

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

  const tableColumns = [
    {
      name: 'Content Title',
      selector: 'contentTitle',
      sortable: true,
      center: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      center: true,
    },

    {
      name: 'Download',
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

  const [viewModal, setViewModal] = useState(false);
  const [student, setStudent] = useState(null);

  const viewToggel = (data) => {
    DownloadCenterRedirect(
      `${process.env.PUBLIC_URL}/dashboards/DownloadCenter/schools`
    );
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Breadcrumb parent={null} title='Download Center' />
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <CardBody>
                <Fragment>
                  <Row>
                    <Col sm={12} md={3}>
                      <DownloadCenterFilter />
                    </Col>
                  </Row>
                  <DataTable
                    data={downloadCenter}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination={true}
                    persistTableHead
                    noHeader={true}
                  />
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DownloadCenter;
