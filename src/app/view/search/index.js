import { connect } from 'react-redux';

import SearchComponent from './search';

import * as actions from '../../core/actions/user.action';

const stateToProps = () => ({

});

const dispatchToProps = (dispatch) => ({
  doGetUser(username) {
    dispatch(actions.getUser(username));
  },
  doSearchUser(query) {
    dispatch(actions.searchUser(query));
  },
  doClearResults() {
    dispatch(actions.clearResults());
  },
});

const Search = connect(stateToProps, dispatchToProps)(SearchComponent);

export default Search;
