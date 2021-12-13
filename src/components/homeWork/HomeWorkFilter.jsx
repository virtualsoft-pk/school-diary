import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';

const HomeWorkFilter = () => {
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
            placeholder='Filter Home Work...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </form>
      </div>
    </div>
  );
};

export default HomeWorkFilter;
