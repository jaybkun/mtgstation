import React, {Component, PropTypes} from 'react'
import {Route, IndexRoute, Link} from 'react-router'

import App from '../components/App';
import Home from '../components/Home';
import Cards from '../components/Cards';

const routes = (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/cards' component={Cards} />
    </Route>
);

module.exports = routes;