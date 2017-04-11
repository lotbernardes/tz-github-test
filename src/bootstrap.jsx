import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import store from './app/core/store';
import i18nData from './app/config/i18n.config';

import Routes from './app/routes';

const AppBootstrap = () => (
  <Provider store={store}>
    <IntlProvider {...i18nData}>
      <Routes />
    </IntlProvider>
  </Provider>);

export default AppBootstrap;
