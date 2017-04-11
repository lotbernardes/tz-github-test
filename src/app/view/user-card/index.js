import { connect } from 'react-redux';

import UserCardComponent from './user-card';

import * as actions from '../../core/actions/user.action';

const stateToProps = () => ({

});

const dispatchToProps = (dispatch) => ({
  doGetUserRepos(url) {
    dispatch(actions.getUserRepos(url));
  },
  doRetrieveUserNotes(userID) {
    dispatch(actions.retrieveUserNotes(userID));
  },
  doUpdateUserNotes(userID, notes) {
    dispatch(actions.updateUserNotes(userID, notes));
  }
});

const UserCard = connect(stateToProps, dispatchToProps)(UserCardComponent);

export default UserCard;
