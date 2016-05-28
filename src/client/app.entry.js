import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {configureStore} from './store';
let routes = require('./routes');

const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

import 'font-awesome/css/font-awesome.min.css';
import './stylesheets/styles.css';

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={history} routes={routes}/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
