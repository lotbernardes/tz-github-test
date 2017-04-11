import React from 'react';
import { Router, Route, IndexRedirect, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './core/store';

import App from './';
import Dashboard from './view/dashboard';
import PageNotFound from './core/view/page-not-found';

import * as presenter from './presenter';

const history = syncHistoryWithStore(hashHistory, store);


const Routes = () => (
  <Router history={ history }>
    <Route onEnter={ presenter.forceTrailingSlash } onChange={ presenter.forceTrailingSlashOnChange }>
      <Route path="/" component={ App }>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={ Dashboard }/>
        <Route path="404" component={ PageNotFound }/>
      </Route>
      <Redirect path="*"  to="/404"/>
    </Route>
  </Router>
);

export default Routes;
