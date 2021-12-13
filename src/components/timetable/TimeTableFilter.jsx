import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TimeTableFilter = () => {
  const text = useRef('');

  useEffect(() => {
   
    //eslint-disable-next-line
  }, []);

//   const onChange = (e) => {
//     if (text.current.value !== '') {
//       filterSchools(e.target.value);
//     } else {
//       clearFilter();
//     }
//   };

  return (
    <div className='card card-mb-faq xs-mt-search'>
      <div className='faq-form'>
        <form>
          <input
            className='form-control no-border'
            ref={text}
            type='text'
            placeholder='Filter School...' 
            // onChange={onChange}
            // disabled={schools !== null ? false : true}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

export default TimeTableFilter;
