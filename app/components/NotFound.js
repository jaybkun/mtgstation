import React,{Component} from 'react';
import {Link} from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <h1>404 Not Found</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default NotFound;
