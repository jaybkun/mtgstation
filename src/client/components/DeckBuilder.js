import React, {Component,PropTypes} from 'react';

class DeckBuilder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Deck Builder</h3>
        <div>
          Cards
        </div>
        <div>
          Analysis
        </div>
      </div>
    );
  }
}

DeckBuilder.propTypes = {

};

DeckBuilder.defaultProps = {

};

export default DeckBuilder;
