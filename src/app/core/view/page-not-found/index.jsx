import React from 'react';
import { IndexLink } from 'react-router';
import FlexBox from 'flexbox-react';

import './page-not-found.css';

const PageNotFound = () => (
  <FlexBox className="page-not-found">
    <h1>404</h1>
    <span>Oh my GOD! This is so wrong...</span>
    <IndexLink to="/">Go to home</IndexLink>
  </FlexBox>
);

export default PageNotFound;
