import * as React from 'react';
import {Component, PropTypes} from 'react';
import {SelectField, MenuItem} from 'material-ui';
import {replaceCost} from '../utils/CostConverter';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEdition: 0
    };

    this.handleEditionChange = this.handleEditionChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props && props.card) {
      this.setState({selectedEdition: props.card.editions.length - 1});
    }
  }

  handleEditionChange(ev, idx) {
    this.setState({selectedEdition: idx});
  }

  render() {
    let powerToughness = null;
    if (this.props.card.power && this.props.card.toughness) {
      powerToughness = <div>Power/Toughness: {this.props.card.power} / {this.props.card.toughness}</div>
    }

    let supertypes = null;
    if (this.props.card.supertypes) {
      supertypes = <div>Supertypes: {this.props.card.supertypes.map(type => {
        return <span key={type}>{type} </span>
      })}</div>
    }
    let types = <div>Type: {this.props.card.types.map(type => {
      return <span key={type}>{type} </span>
    })}</div>;

    let subtypes = null;
    if (this.props.card.subtypes) {
      subtypes = <div>Subtypes: {this.props.card.subtypes.map(type => {
        return <span key={type}>{type} </span>
      })}</div>
    }

    return (
      <div style={{width:'100%'}}>
        <div style={{float:'left'}}>
          <div style={{display:'inline-block'}}>
            {this.props.card.editions ?
              <img src={this.props.card.editions[this.state.selectedEdition].image_url}/> : null}
          </div>
          <div style={{display: 'block'}}>
            <SelectField value={this.state.selectedEdition} onChange={this.handleEditionChange}>
              {this.props.card.editions.map((edition, i)=> {
                return <MenuItem key={edition.set_id + '_' + i} value={i} primaryText={edition.set}/>
              })}
            </SelectField>
          </div>
        </div>

        <div style={{display:'flex'}}>
          <div>
            <div style={{display:'flex'}}>
              <div style={{float:'left', margin: '0 16px 0 0'}}>{this.props.card.name}</div>
              <div style={{float:'left', margin: '0 16px 0 0'}}><div dangerouslySetInnerHTML={replaceCost(this.props.card.cost)}></div></div>
            </div>
            <div>
              {supertypes}
              {types}
              {subtypes}

              {this.props.card.colors ? <div>Colors: {this.props.card.colors.map(color => {
                return <span key={color}>{color} </span>
              })}
              </div> : <div>Colors: None</div>}
            </div>

            <div style={{boxShadow:'1px 1px 3px #555 inset',padding:'3px'}}>
              <div dangerouslySetInnerHTML={replaceCost(this.props.card.text)}></div>
              <br/>
              {this.props.card.editions ? <div><span
                style={{fontStyle:'italic'}}>{this.props.card.editions[this.state.selectedEdition].flavor}</span>
              </div> : null}
            </div>
            <br/>
            {powerToughness}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    supertypes: PropTypes.array,
    types: PropTypes.array.isRequired,
    subtypes: PropTypes.array,
    colors: PropTypes.array,
    cmc: PropTypes.number.isRequired,
    cost: PropTypes.string,
    text: PropTypes.string,
    power: PropTypes.string,
    toughness: PropTypes.string,
    editions: PropTypes.arrayOf(PropTypes.shape({
      set: PropTypes.string.isRequired,
      set_id: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
      multiverse_id: PropTypes.number.isRequired,
      number: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    }).isRequired).isRequired
  })
};

Card.defaultProps = {
  card: {
    name: '',
    supertypes: [],
    types: [],
    subtypes: [],
    colors: [],
    cmc: 0,
    cost: '',
    text: '',
    power: '',
    toughness: '',
    editions: [{
      set: '',
      rarity: '',
      multiverse_id: 0,
      number: '',
      image_url: ''
    }]
  }
};

export default Card;
