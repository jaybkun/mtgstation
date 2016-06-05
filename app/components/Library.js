import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Paper, Menu} from 'material-ui';

class Library extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={{display:'flex', float:'left'}}>
          <Paper style={{display:'inline-block', margin: '0 16px 8px 0'}}>
            <Menu>

            </Menu>
          </Paper>
        </div>
        <div style={{display:'flex', margin: '8px 16px 8px 0'}}>
          {this.props.children ? this.props.children : <div style={{textAlign:'center'}}>Coming Soon</div>}
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  children: PropTypes.node
};

export default Library;
