import React,{Component,PropTypes} from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <div>Name: {this.props.card.name}</div>
          <div>Cost: {this.props.card.cost}</div>
          <div>Type: {this.props.card.types.map(type => {
            return <span>{type} </span>})}
          </div>
          <div>Colors: {this.props.card.colors.map(color => {
            return <span>{color} </span>})}
          </div>
          <div>Text: {this.props.card.text}</div>
          <div>Power: {this.props.card.power}</div>
          <div>Toughness: {this.props.card.toughness}</div>

          {JSON.stringify(this.props.card)}
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    cmc: PropTypes.string.isRequired,
    supertypes: PropTypes.arrayOf(PropTypes.string.isRequired),
    types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    subtypes: PropTypes.arrayOf(PropTypes.string),
    colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    text: PropTypes.string.isRequired,
    power: PropTypes.string,
    toughness: PropTypes.string
  })
};


Card.defaultProps = {
  card: {
    name: '',
    cost: '',
    cmc: '',
    supertypes: [],
    types: [],
    subtypes: [],
    colors: [],
    text: '',
    power: '',
    toughness: ''
  }
};

export default Card;
