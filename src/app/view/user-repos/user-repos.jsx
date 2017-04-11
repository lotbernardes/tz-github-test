import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexBox from 'flexbox-react';
import Paper from 'material-ui/Paper';

import ContentProxy from '../../core/view/content-proxy'

import './user-repos.css';

class UserReposComponent extends Component {
  componentWillMount() {
    this.props.doGetUserRepos(this.props.resourceUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resourceUrl !== this.props.resourceUrl) {
      this.props.doGetUserRepos(nextProps.resourceUrl);
    }
  }

  hasContent = () => (this.props.repos.results.length > 0);

  noContentText = 'No repositories found.';

  content = () => {
    return this.props.repos.results.map(repo => {
      return(
      <Paper key={repo.id} rounded={ false }>
        <FlexBox className="user-repos-item">
          <a href={repo.html_url}>{repo.name}</a>
          <span>{repo.description}</span>
        </FlexBox>
      </Paper>
      );
    });
  };

  render() {
    return(
      <ContentProxy hasContent={ this.hasContent() } noContentText={ this.noContentText }>
        <FlexBox className="user-repos-list">
          { this.content() }
        </FlexBox>
      </ContentProxy>
    );
  }

}

UserReposComponent.propTypes = {
  resourceUrl: PropTypes.string.isRequired,
};

export default UserReposComponent;
