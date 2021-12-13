import React, { useRef, useEffect } from 'react';
import { Search } from 'react-feather';
import { Row, Col, Form, Input, Label, FormGroup } from 'reactstrap';

const CollectFeeFilter = () => {
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
      <Label htmlFor='search'>Search By Keyword</Label>
      <div className='faq-form'>
        <Form>
          <Input
            className='form-control no-border'
            ref={text}
            type='text'
            placeholder='Filter...'
            onChange={onChange}
          />
          <Search className='search-icon' />
        </Form>
      </div>
    </div>
  );
};

export default CollectFeeFilter;
