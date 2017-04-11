import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexBox from 'flexbox-react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';

import UserRepos from '../user-repos';
import Pagination from '../pagination';

import './user-card.css';

const textFieldProps = {
  underlineFocusStyle: {
    borderColor: grey500,
  },
  inputStyle: {
    color: grey500,
  },
  hintStyle: {
    bottom: 'initial',
    padding: 10,
  },
  multiLine: true,
  rows: 12,
  underlineShow: false,
  fullWidth: true,
  textareaStyle: {
    padding: 10,
    margin: 0,
  },
};

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: "",
    }
  }

  componentWillMount() {
    this.handleRetrieveNotes(this.props.current.result.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current.result !== this.props.current.result) {
      this.handleRetrieveNotes(nextProps.current.result.id);
    }

    if (nextProps.current.notes !== this.props.current.notes) {
      this.setState({
        notes: nextProps.current.notes,
      });
    }
  }

  handlePaginate = (event, url) => {
    this.props.doGetUserRepos(url);
  };

  handleRetrieveNotes = (id) => {
    this.props.doRetrieveUserNotes(id);
  };

  handleBlur = (event, id) => {
    event.preventDefault();

    this.props.doUpdateUserNotes(id, this.state.notes);
  };

  handleChange = (event, value) => {
    event.preventDefault();

    this.setState({
      notes: value,
    });
  };

  render() {
    const {result, repos} = this.props.current;

    return (<Card {...this.props.children} className="user-card">
        <CardHeader
          title={ <a href={result.html_url} target="blank">{ !!result.name ? result.name : result.login }</a>  }
          subtitle={ result.login }
          avatar={ result.avatar_url }
        />
        <hr/>
        <CardText className="user-card-text-container">
          <FlexBox className="user-card-content">
            <FlexBox className="user-card-general-info">
              <span>{`${result.hireable ? "Available for hiring!" : ""}`}</span>
              <span><strong>{result.followers}</strong> followers</span>
              <span><strong>{result.following}</strong> following</span>
            </FlexBox>
            <FlexBox className="user-card-repos-container">
              <span>Repositories:</span>
              <FlexBox className="user-card-repos">
                <UserRepos resourceUrl={ result.repos_url }/>
              </FlexBox>
              <FlexBox className="user-card-repos-paging">
                <Pagination pagingArray={ repos.paging } onPaginate={ this.handlePaginate } />
              </FlexBox>
            </FlexBox>
            <FlexBox className="user-card-notes">
              <span>Notes:</span>
              <Paper>
                <TextField
                  {...textFieldProps}
                  id={result.login}
                  hintText="Here you can add some notes about the chosen one."
                  onBlur={ (event) => { this.handleBlur(event, result.id) } }
                  onChange={ this.handleChange }
                  value={ this.state.notes }
                />
              </Paper>
            </FlexBox>
          </FlexBox>
        </CardText>
      </Card>
    );
  }
}

UserCard.propTypes = {
  current: PropTypes.object.isRequired,
};

export default UserCard;
