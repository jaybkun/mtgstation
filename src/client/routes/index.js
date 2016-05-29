import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../components/App';
import Home from '../components/Home';
import Cards from '../components/Cards';
import Decks from '../components/Decks';
import Deck from '../components/Deck';
import NotFound from '../components/NotFound';

const routes = (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/cards' component={Cards}/>
      <Route path='/decks' component={Decks}>
        <Route path='/decks/:deck' component={Deck} />
      </Route>
      <Route path='*' component={NotFound} />
    </Route>
);

module.exports = routes;