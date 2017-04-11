import React from 'react';
import PropTypes from 'prop-types';

import NoContent from '../no-content';

const ContentProxy = (props) => {
  if (props.hasContent) {
    return(props.children);
  }

  if (props.noContentText) {
    return(<span>{props.noContentText}</span>);
  }

  return(<NoContent />);
};

ContentProxy.propTypes = {
  hasContent: PropTypes.bool.isRequired,
  noContentText: PropTypes.string,
};

export default ContentProxy;
