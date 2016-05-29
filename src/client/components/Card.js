import React, {Component, PropTypes} from 'react';
class Card extends Component {
  constructor(props) {
    super(props);

    this.replaceCost = this.replaceCost.bind(this);
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

    const devoidRx = new RegExp(/{d}/ig);
    text = text.replace(devoidRx, '<img height=\'' + height + '\' src=\'../images/devoid_mana.png\'/>');

    const xmanaRx = new RegExp(/{x}/ig);
    text = text.replace(xmanaRx, '<img height=\'' + height + '\' src=\'../images/x_mana.png\'/>');

    const tapRx = new RegExp(/{t}/ig);
    text = text.replace(tapRx, '<img height=\'' + height + '\' src=\'../images/tap.png\'/>');

    const colorlessRx = new RegExp(/{(\d+)}/);
    if (colorlessRx.test(text)) {
      let colorlessCost = text.match(colorlessRx);
      text = text.replace(colorlessRx, '<img height=\'' + height + '\' src=\'../images/' + colorlessCost[1] + '_mana.png\'/>');
    }

    return {__html: text};
  }

  render() {
    return (
      <div>
        <div>Name: {this.props.card.name}</div>
        <div>Cost: <div dangerouslySetInnerHTML={this.replaceCost(this.props.card.cost)}/></div>
        <div>CMC: {this.props.card.cmc}</div>

        <div>Type: {this.props.card.types.map(type => {
          return <span>{type} </span>
        })}
        </div>

        {this.props.card.colors ? <div>Colors: {this.props.card.colors.map(color => {
          return <span>{color} </span>
        })}
        </div> : <div>Colors: None</div>}

        <div>Text: <div dangerouslySetInnerHTML={this.replaceCost(this.props.card.text)}/></div>

        {this.props.card.power ? <div>Power: {this.props.card.power}</div> : null}
        {this.props.card.toughness ? <div>Toughness: {this.props.card.toughness}</div> : null}

        {this.props.card.editions ? <div>
          Editions:
          <br />
          {this.props.card.editions.map((edition, i)=> {
            return <div key={edition.multiverse_id + '_' + i} style={{display:'block', float:'left'}}>
              <div style={{textAlign:'center'}}>{edition.set}</div>
              <img src={edition.image_url}/>
            </div>;
          })}
        </div> : null}
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    types: PropTypes.array
  })
};

Card.defaultProps = {
  card: {
    name: '',
    types: []
  }
};

export default Card;
