import React from 'react';
import ReactDOM from 'react-dom';

import AppBootstrap from '../src/bootstrap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppBootstrap />, div);
});
