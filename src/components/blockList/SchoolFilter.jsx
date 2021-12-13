import React, { useState,useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {FormGroup, Form} from "reactstrap"

const SchoolFilter = () =>{
    const schools = [
      {
        schoolId:"1",
        schoolName: 'MTB',
        location: 'SDK',
        branch: 'Sadiqabad',
        postalCode: '4037',
        principal: 'Zaid',
        salesPersonId: '2',
        noOfStudent: 1500,
        packages: 'Gold',
        price: 55000,
        payAmount: 30000,
        blockDate: "2021-02-23"
      },
      {
        schoolId:"2",
        schoolName: 'Punjab',
        location: 'RYK',
        branch: 'RYK',
        postalCode: '4337',
        principal: 'Asif',
        salesPersonId: '3',
        noOfStudent: 1000,
        packages: 'Silver',
        price: 35000,
        payAmount: 20000,
        blockDate: "2021-07-05"
      },
      {
        schoolId:"3",
        schoolName: 'Iqra',
        location: 'SDK',
        branch: 'Sadiqabad',
        postalCode: '4037',
        principal: 'Zaid',
        salesPersonId: '2',
        noOfStudent: 1500,
        packages: 'Gold',
        price: 55000,
        payAmount: 30000,
        blockDate: "2020-10-13"
      },
    ];
    const[selected ,setSelected] = useState(null)
    console.log("selectedd::", selected)

    return (
      <div className='card card-mb-faq xs-mt-search'>
        <div className='faq-form'>
        <form>
          <Typeahead
            id='multiple-typeahead'
            clearButton
            labelKey="schoolName"
            options={schools}
            placeholder="Filter School...."
            onChange={(select)=>setSelected(select)}
          />
         
        </form>
        </div>
      </div>
    );
  };

export default SchoolFilter;
