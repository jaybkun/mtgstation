import * as React from 'react';
import {Component, PropTypes} from 'react';
import {List, ListItem, Divider, Paper, Menu, MenuItem} from 'material-ui';

class Decks extends Component {
  constructor(props) {
    super(props);

    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(deck) {
    this.context.router.push(deck);
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={{display:'flex', float:'left'}}>
          <Paper style={{display:'inline-block', margin: '0 16px 8px 0'}}>
            <Menu>
              <MenuItem onTouchTap={this.handleNav.bind(this, '/decks/deckBuilder')} primaryText="Build a Deck"/>
              <MenuItem onTouchTap={this.handleNav.bind(this, '/decks')} primaryText="My Decks"/>
              <Divider/>
              <List>
                <ListItem onTouchTap={this.handleNav.bind(this, '/decks/deck1')} primaryText="Deck 1"/>
              </List>
            </Menu>
          </Paper>
        </div>
        <div style={{display:'flex', margin: '8px 16px 8px 0'}}>
          {this.props.children ? this.props.children : <div style={{textAlign:'center'}}>Coming Feature Soon</div>}
        </div>
      </div>
    )
  }
}

Decks.contextTypes = {
  router: PropTypes.object.isRequired
};

Decks.propTypes = {
  children: PropTypes.node.isRequired
};

export default Decks;
