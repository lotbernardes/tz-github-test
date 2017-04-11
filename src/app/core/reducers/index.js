import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.reducer';

export default combineReducers({
  user,
  routing: routerReducer,
});
