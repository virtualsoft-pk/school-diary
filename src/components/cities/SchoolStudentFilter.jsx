import React, { useRef,useState } from 'react';
import { Search } from 'react-feather';
const SchoolStudentFilter = () => {
  const text = useRef('');

  const onChange = (e) => {};
  return (
      <div className='card card-mb-faq xs-mt-search'>
        <div className="faq-form">
          <form>
            <input
              className='form-control no-border'
              ref={text}
              type='text'
              placeholder='Filter Student...'
              onChange={onChange}
            />
            <Search className='search-icon' />
          </form>
        </div>
        </div>
    
  );
};

export default SchoolStudentFilter;
