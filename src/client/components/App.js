import React,{Component, PropTypes} from 'react'
import {AppBar, Drawer, MenuItem, Subheader, Divider} from 'material-ui';
import {IndexLink, Link} from 'react-router'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleNav(target) {
    this.context.router.push(target);
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <AppBar
          title="MTG Station"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"/>

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Subheader>Options</Subheader>
          <MenuItem onTouchTap={this.handleNav.bind(this, '/')}>Home</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleNav.bind(this, '/cards')}>Search Cards</MenuItem>
          <MenuItem onTouchTap={this.handleNav.bind(this, '/cards')}>Build a Deck</MenuItem>
        </Drawer>

        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

App.propTypes = {

};

export default App;
