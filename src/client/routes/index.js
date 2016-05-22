import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App';

const Home = () => (<div>Home</div>);
const Foo = () => (<div>Foo</div>);
const Bar = () => (<div>Bar</div>);

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/foo' component={Foo} />
    <Route path='/bar' component={Bar} />
  </Route>
);

export default routes;
