import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexBox from 'flexbox-react';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';

import './search.css';

const SEARCH_MODE = 'single-user';

class SearchComponent extends Component {
  styles = {
    underlineFocusStyle: {
      borderColor: grey500,
    },
    inputStyle: {
      color: grey500,
    }
  };

  searchOrClear = (value) => {
    if (value.length > 0) {
      switch(SEARCH_MODE) {
        default:
        case 'single-user': {
          this.props.doGetUser(value);

          break;
        }
        case 'multi-user': {
          this.props.doSearchUser(value);

          break;
        }

      }
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (!!this.props.onSearchBegin) {
        this.props.onSearchBegin(event, event.target.value);
      }

      this.searchOrClear(event.target.value)
    }
  };

  handleRef = (input) => {
    input && input.focus();
  };

  render() {
    return(
      <FlexBox className="search-bar-container">
        <label>Who will be our hero for today?</label>
        <TextField
          id="search-bar" {...this.styles}
          onKeyDown={ this.handleKeyDown }
          ref={ this.handleRef }
        />
      </FlexBox>
    );

  }
}

SearchComponent.propTypes = {
  onSearchBegin: PropTypes.func.isRequired,
};

export default SearchComponent;