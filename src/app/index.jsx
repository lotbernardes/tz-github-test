import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlexBox from 'flexbox-react';

import ContentArea from './core/view/content-area';

import './app.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = props => (
  <MuiThemeProvider>
    <FlexBox className="app-container">
      <FlexBox className="content-area-container">
        <ContentArea {...props} />
      </FlexBox>
    </FlexBox>
  </MuiThemeProvider>
);

export default App;
