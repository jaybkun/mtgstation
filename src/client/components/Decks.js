import React, {Component, PropTypes} from 'react';
import {List, ListItem, Divider, Paper, Subheader, Menu, MenuItem} from 'material-ui';

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
      <div style={{width:'100%'}}>
        <div style={{float:'flex'}}>
          <Paper style={{display:'inline-block', margin: '16px 32px 16px 0'}}>
            <Menu>
              <MenuItem onClick={this.handleNav.bind(this, '/decks/deckBuilder')} primaryText="Build a Deck"/>
              <MenuItem onClick={this.handleNav.bind(this, '/decks')} primaryText="My Decks"/>
              <Divider inset={true}/>
              <List>
                <Subheader inset={true}>My Decks</Subheader>
                <ListItem onClick={this.handleNav.bind(this, '/decks/deck1')} primaryText="Deck 1"/>
              </List>
            </Menu>
          </Paper>
        </div>
        <div style={{display:'flex'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Decks.contextTypes = {
  router: PropTypes.object.isRequired
};

Decks.propTypes = {};

export default Decks;
