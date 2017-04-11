import React from 'react';
import FlexBox from 'flexbox-react';

import './content-area.css';

const ContentAreaComponent = props => (
  <FlexBox className="content-area">
    <FlexBox className="content-area-view">
      { props.children }
    </FlexBox>
  </FlexBox>
);

export default ContentAreaComponent;
