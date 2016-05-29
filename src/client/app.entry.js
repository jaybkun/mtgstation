import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

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
    <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
