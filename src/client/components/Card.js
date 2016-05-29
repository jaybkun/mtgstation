import React, {Component, PropTypes} from 'react';
import {SelectField, MenuItem} from 'material-ui';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEdition: 0
    };

    this.replaceCost = this.replaceCost.bind(this);
    this.handleEditionChange = this.handleEditionChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({selectedEdition: props.card.editions.length - 1});
  }

  handleEditionChange(ev, idx, value) {
    this.setState({selectedEdition: idx});
  }

  replaceCost(text) {
    const height = 24;
    if (!text) {
      return null;
    }

    const whiteRx = new RegExp(/{w}/ig);
    text = text.replace(whiteRx, '<img height=\'' + height + '\' src=\'../images/white_mana.png\'/>');

    const blueRx = new RegExp(/{u}/ig);
    text = text.replace(blueRx, '<img height=\'' + height + '\' src=\'../images/blue_mana.png\'/>');

    const blackRx = new RegExp(/{b}/ig);
    text = text.replace(blackRx, '<img height=\'' + height + '\' src=\'../images/black_mana.png\'/>');

    const redRx = new RegExp(/{r}/ig);
    text = text.replace(redRx, '<img height=\'' + height + '\' src=\'../images/red_mana.png\'/>');

    const greenRx = new RegExp(/{g}/ig);
    text = text.replace(greenRx, '<img height=\'' + height + '\' src=\'../images/green_mana.png\'/>');

    const devoidRx = new RegExp(/{c}/ig);
    text = text.replace(devoidRx, '<img height=\'' + height + '\' src=\'../images/devoid_mana.png\'/>');

    const xmanaRx = new RegExp(/{x}/ig);
    text = text.replace(xmanaRx, '<img height=\'' + height + '\' src=\'../images/x_mana.png\'/>');

    const tapRx = new RegExp(/{t}/ig);
    text = text.replace(tapRx, '<img height=\'' + height + '\' src=\'../images/tap.png\'/>');

    const colorlessRxAll = new RegExp(/{(\d+)}/g);
    const colorlessRx = new RegExp(/{(\d+)}/);
    if (colorlessRxAll.test(text)) {
      let colorlessCost = text.match(colorlessRxAll);
      for (let match of colorlessCost) {
        let instance = colorlessRx.exec(match);
        text = text.replace(colorlessRx, '<img height=\'' + height + '\' src=\'../images/' + instance[1] + '_mana.png\'/>');
      }
    }

    return {__html: text};
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
      <div>
        <div style={{float:'left', marginRight:'10px'}}>
          {this.props.card.editions ? <img src={this.props.card.editions[this.state.selectedEdition].image_url}/> : null }
        </div>

        <div style={{width: '50%', float:'left'}}>
          <div style={{display:'inline-block'}}>
            <div style={{float:'left', marginRight: '10px'}}>{this.props.card.name}</div>
            <div style={{float:'left'}} dangerouslySetInnerHTML={this.replaceCost(this.props.card.cost)}/>
            <div style={{float:'right'}}>CMC: {this.props.card.cmc}</div>
          </div>
          <hr/>

          {supertypes}
          {types}
          {subtypes}

          {this.props.card.colors ? <div>Colors: {this.props.card.colors.map(color => {
            return <span key={color}>{color} </span>
          })}
          </div> : <div>Colors: None</div>}

          <div style={{boxShadow:'1px 1px 3px #555 inset',padding:'3px'}}>
            <div dangerouslySetInnerHTML={this.replaceCost(this.props.card.text)}/>
            <br/>
            {this.props.card.editions ? <div><span style={{fontStyle:'italic'}}>{this.props.card.editions[this.state.selectedEdition].flavor}</span></div> : null}
          </div>
          <br/>

          <br/>
          {powerToughness}

          <br/>
          <SelectField value={this.state.selectedEdition} onChange={this.handleEditionChange}>
            {this.props.card.editions.map((edition, i)=> {
              return <MenuItem key={edition.set_id + '_' + i} value={i} primaryText={edition.set}/>
            })}
          </SelectField>
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
    cmc: PropTypes.string.isRequired,
    cost: PropTypes.string,
    text: PropTypes.string,
    editions: PropTypes.arrayOf(PropTypes.shape({
      set: PropTypes.string.isRequired,
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
    cmc: '',
    cost: '',
    text: '',
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
