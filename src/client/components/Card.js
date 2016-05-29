import React, {Component, PropTypes} from 'react';
import assign from 'object-assign';

class Card extends Component {
  constructor(props) {
    super(props);

    if (!props.card.name || !props.card) {
      this.state = {
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
    } else {
      this.state = assign({}, props.card);
    }
    // TODO set default props correctly and don't use state at all
  }

  componentWillReceiveProps(props) {
    if (props.card) {
      this.setState({card: assign({}, props.card)});
    }
  }

  render() {
    return (
      <div>
        <div>Name: {this.state.card.name}</div>
        <div>Cost: {this.state.card.cost}</div>
        <div>Type: {this.state.card.types.map(type => {
          return <span>{type} </span>
        })}
        </div>
        <div>Colors: {this.state.card.colors.map(color => {
          return <span>{color} </span>
        })}
        </div>
        <div>Text: {this.state.card.text}</div>
        {this.state.card.power !== '' ? <div>Power: {this.state.card.power}</div> : null}
        {this.state.card.toughness !== '' ? <div>Toughness: {this.state.card.toughness}</div> : null}

        {this.state.card.editions ? <div>
          Editions:
          {this.state.card.editions.map(edition => {
            return <div style={{display:'block', float:'left'}}>
              <div style={{textAlign:'center'}}>{edition.set}</div>
              <img src={edition.image_url}/>
            </div>;
          })}

        </div> : null
        }
      </div>
    );
  }
}

export default Card;
