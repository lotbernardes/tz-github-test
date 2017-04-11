import { connect } from 'react-redux';

import UserReposComponent from './user-repos';

import * as actions from '../../core/actions/user.action';

const stateToProps = (state) => ({
  repos: state.user.current.repos,
});

const dispatchToProps = (dispatch) => ({
  doGetUserRepos(resourceUrl) {
    dispatch(actions.getUserRepos(resourceUrl));
  },
});

const UserRepos = connect(stateToProps, dispatchToProps)(UserReposComponent);

export default UserRepos;
