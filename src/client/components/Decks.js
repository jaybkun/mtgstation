import React,{Component,PropTypes} from 'react';
import {Menu,MenuItem,Divider,Paper} from 'material-ui';

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
      <div>
        <div style={{float:'left'}}>
          <Paper style={{display:'inline-block', margin: '16px 32px 16px 0'}}>
            <Menu>
              <MenuItem primaryText="Build a Deck"/>
              <Divider/>
              <MenuItem onClick={this.handleNav.bind(this, '/decks/deck1')} primaryText="Deck 1"/>
            </Menu>
          </Paper>
        </div>
        {this.props.children}
      </div>
    )
  }
}

Decks.contextTypes = {
  router: PropTypes.object.isRequired
};

Decks.propTypes = {};

export default Decks;
