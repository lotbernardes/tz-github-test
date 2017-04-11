import { applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import apiError from './api-error-middleware';
import localStorage from './local-storage-middleware';

// https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions
const routerHistory = routerMiddleware(hashHistory);

export const middlewares = [
  thunk,
  promise(),
  apiMiddleware,
  apiError,
  localStorage,
  routerHistory,
];

if (process.env.NODE_ENV.toLowerCase() === 'development') {
  // https://github.com/evgenyrodionov/redux-logger#transform-symbol-action-type-to-string
  middlewares.push(createLogger({
    actionTransformer: (action) => ({
      ...action,
      type: String(action.type),
    }),
  }));
}

export default applyMiddleware(...middlewares);
