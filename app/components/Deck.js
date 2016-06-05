import * as React from 'react';
import {Component,PropTypes} from 'react';

class Deck extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.deck.title}</h3>
        <div>
          Cards
        </div>
        <div>
          Analysis
        </div>
      </div>
    )
  }
}

Deck.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }).isRequired
};

Deck.defaultProps = {
  deck: {
    title: '',
    id: '',
    cards: []
  }
};

export default Deck;
