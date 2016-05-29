import React,{Component,PropTypes} from 'react';

class Deck extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Deck</h3>
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
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }).isRequired
};

Deck.defaultProps = {
  deck: {
    name: '',
    id: '',
    cards: []
  }
};

export default Deck;
