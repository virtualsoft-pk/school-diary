import React, { useEffect, useRef } from 'react';
import { Search } from 'react-feather';
// import { filterBlog, clearFilter } from '../../actions/blogActions';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

const StudentFilter = () =>
  // { filterBlog, clearFilter }
  {
    const text = useRef('');

    //   useEffect(() => {
    //     clearFilter();
    //     //eslint-disable-next-line
    //   }, []);

    const onChange = (e) => {
      // if (text.current.value !== '') {
      //   filterBlog(e.target.value);
      // } else {
      //   clearFilter();
      // }
    };

    return (
      <div className='student-filter'>
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
       </div>
    );
  };

// StudentFilter.propTypes = {
//   filterBlog: PropTypes.func.isRequired,
//   clearFilter: PropTypes.func.isRequired,
// };

// export default connect(null, { filterBlog, clearFilter })(StudentFilter);

export default StudentFilter;
