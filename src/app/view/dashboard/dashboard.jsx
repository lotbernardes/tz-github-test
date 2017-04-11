import React, { Component } from 'react';
import FlexBox from 'flexbox-react';

import ContentProxy from '../../core/view/content-proxy';
import Search from '../search';
import UserCard from '../user-card';

import './dashboard.css';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    }
  }

  handleSearchBegin = (event, value) => {
    this.setState({
      searching: value.length > 0,
    })
  };

  createUserCard = (current) => (
    <UserCard current={current} />
  );

  hasContent = () => {
    return this.props.results.length > 0 || !!this.props.current.result;
  };

  content = () => {
    if (this.props.results.length > 0) {
      return this.props.results.map(this.createUserCard);
    } else if (!!this.props.current) {
      return this.createUserCard(this.props.current);
    }
  };

  render() {
    return (
      <FlexBox className="dashboard-container">
        <FlexBox className={`dashboard-search-container${ this.state.searching ? ' searching' : '' }`}>
          <Search onSearchBegin={ this.handleSearchBegin }/>
        </FlexBox>
        <FlexBox className={`dashboard-result-container${ this.state.searching && this.hasContent() ? ' display-results' : '' }`}>
          <ContentProxy hasContent={ this.hasContent() }>
            <FlexBox>
              { this.content() }
            </FlexBox>
          </ContentProxy>
        </FlexBox>
      </FlexBox>
    );
  }
}

export default DashboardComponent;