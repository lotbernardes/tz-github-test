import React from 'react';
import PropTypes from 'prop-types';
import FlexBox from 'flexbox-react';

import './pagination.css';

const Pagination = (props) => {
  const handleClick = (event, result) => {
    if (!!props.onPaginate && result.rel !== 'current')
      props.onPaginate(event, result.url);
  };

  const pagingButtons = (pagingArray) => {
    return pagingArray.map((result => {
      return <span className={result.rel} key={result.rel} onClick={ event => { handleClick(event, result) } }>
        { result.rel === 'current' ? result.page : result.rel }
        </span>
    }));
  };

  return(
    <FlexBox className="pagination-container">
      { pagingButtons(props.pagingArray) }
    </FlexBox>
  );
};

Pagination.propTypes = {
  pagingArray: PropTypes.array.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default Pagination;