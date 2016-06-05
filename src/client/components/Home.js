import * as React from 'react';
import {Component,PropTypes} from 'react';
import {Paper} from 'material-ui';
import {replaceCost} from '../utils/CostConverter';

class Home extends Component {
  constructor(props) {
    super(props);

    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(target) {
    this.context.router.push(target);
  }

  render() {
    const style = {
      height: '300px',
      width: '42%',
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    };

    return (
      <div style={{textAlign:'center'}}>
        <h1>Magic the Gathering Deck Station</h1>

        <div style={{width: '100%', overflow:'hidden'}}>
          <Paper style={style} zDepth={3} onTouchTap={this.navigateTo.bind(this, '/cards')}>
            Cards
          </Paper>

          <Paper style={style} zDepth={3} onTouchTap={this.navigateTo.bind(this, '/decks')}>
            Decks
          </Paper>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.object.isRequired
};

export default Home;
