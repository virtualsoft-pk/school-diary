import React, { Fragment, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import DataTable from 'react-data-table-component';
import { Edit3, Trash, Eye } from 'react-feather';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';


const Fees = () => {
    const fees = [
        {
            paymentId:"1",
            name: "Ali",
            date: "2003-04-28",
            class: "12",
            section: "F",
            status: "paid"
        },
        {
            paymentId:"2",
            name: "Hira",
            date: "1996-06-24",
            class: "18",
            section: "B",
            status: "not-paid"
        },
        {
            paymentId:"3",
            name: "16",
            date: "1999-09-11",
            class: "male",
            section: "C",
            status: "paid"
        },
      ];
  
      const tableColumns = [
        {
          name: 'PaymentID',
          selector: 'paymentId',
          sortable: true,
          center: true,
        },
        {
          name: 'StudentName',
          selector: 'name',
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
          name: 'Class',
          selector: 'class',
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
            name: 'Status',
            center: true,
            cell: (row) => (
              <p className={row.status === "not-paid" ? "f-12 font-danger" : "f-12 font-success"}>{row.status}</p>
            ),
          },
  

      ];
  
  
      return (
         <Fragment>
        <Breadcrumb parent={null} title='Fee List' />
        <Container fluid={true}>
            <Card>
                <CardBody>
            {/* {Schools !== null && !loading ? (
                    <TransitionGroup>
                        {filtered === null ? ( */}
                    <DataTable
                        data={fees}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        persistTableHead
                        noHeader={true}
                        pagination={true}
                    />
            
                    {/*</Fragment>//       ) : (
                //         <DataTable
                //           data={filtered}
                //           columns={tableColumns}
                //           striped={true}
                //           center={true}
                //           persistTableHead
                //           noHeader={true}
                //           pagination={true}
                //         />
                //       )}
                //     </TransitionGroup>
                //   ) : (
                //     <TableLoader />
                //   )} */}
                </CardBody>
              </Card>
         
         </Container>
        </Fragment>
      );
    };

export default Fees
