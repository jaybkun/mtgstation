import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../components/App';
import Home from '../components/Home';
import Cards from '../components/Cards';
import Decks from '../components/Decks';
import Deck from '../components/Deck';
import DeckBuilder from '../components/DeckBuilder';
import Library from '../components/Library';
import Login from '../components/Login';

import About from '../components/About';
import NotFound from '../components/NotFound';

const routes = (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/cards' component={Cards}/>
      <Route path='/decks' component={Decks}>
        <Route path='/decks/deckBuilder' component={DeckBuilder} />
        <Route path='/decks/:deck' component={Deck} />
      </Route>
      <Route path='/library' component={Library}/>
      <Route path='/about' component={About}/>
      <Route path='*' component={NotFound} />
    </Route>
);

module.exports = routes;