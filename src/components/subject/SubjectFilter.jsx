import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';

const SubjectFilter = () => {
  const text = useRef('');

  const onChange = (e) => {
    // if (text.current.value !== '') {
    //   filterCategory(e.target.value);
    // } else {
    //   clearFilter();
    // }
  };

  return (
    <div className='card card-mb-faq xs-mt-search'>
      <div className='faq-form'>
        <form>
          <input
            className='form-control no-border'
            ref={text}
            type='text'
            placeholder='Filter Subject...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

export default SubjectFilter;
