import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class App extends Component {

  render() {
    return (
      <div>
        <h1>MTG Station Thing</h1>
        Links:
        {' '}
        <Link to='/'>Home</Link>
        {' '}
        <Link to='/foo'>Foo</Link>
        {' '}
        <Link to='/bar'>Bar</Link>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
