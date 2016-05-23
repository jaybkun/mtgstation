import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {fetchCards} from '../actions/FetchActions';
import {connect} from 'react-redux';

class App extends Component {

  constructor() {
    super();

    this.state = {
      cardName: '',
      returnedCards: []
    };
    this.onSearchCardsChange = this.onSearchCardsChange.bind(this);
  }

  onSearchCardsChange(ev) {
    ev.preventDefault();
    this.props.dispatch(fetchCards(ev.target.value));
    this.setState({cardName: ev.target.value});
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
          </ul>
        </nav>
        <div>
          <input type='text' id='cardSearch' value={this.state.cardName} onChange={this.onSearchCardsChange} />
          <div id='cardList'><ul>
            {this.state.returnedCards.map(card => {
              return <li>{JSON.stringify(card)}</li>;
            })}</ul>
          </div>
          <div>
            card: {this.state.cardName}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
