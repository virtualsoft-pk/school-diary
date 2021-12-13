import React, { useRef, useEffect } from 'react';
import {
  filterSalesPersons,
  clearFilter,
} from '../../actions/salesPersonsAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';

const SalePersonFilter = ( {SalesPersons: {salesPersons, salesPersonsFiltered }, filterSalesPersons, clearFilter}) => {
    const text = useRef('');

    useEffect(() => {
        clearFilter();
        if (salesPersonsFiltered === null) {
        text.current.value = '';
        }
        // eslint-disable-next-line
    },[]);
    
    const onChange = e => {
        if (text.current.value !== '') {
        filterSalesPersons(e.target.value);
        } else {
        clearFilter();
        }
    };
    
    return (
        <div className='card card-mb-faq xs-mt-search'>
        <div className='faq-form'>
          <form>
            <input
              className='form-control no-border'
              ref={text}
              type='text'
              placeholder='Filter School...'
              onChange={onChange}
              disabled={salesPersons !== null ? false : true}
            />
            <Search className='search-icon' />
          </form>
        </div>
      </div>
  );
};

SalePersonFilter.propTypes = {
    SalesPersons: PropTypes.object.isRequired,
    filterSalesPersons: PropTypes.func.isRequired,
    clearFilter:PropTypes.func.isRequired,
  };
   
  const mapStateToProps = (state) => ({
    SalesPersons: state.SalesPersons,
  });
  
  export default connect(mapStateToProps, {filterSalesPersons, clearFilter}) (SalePersonFilter);
