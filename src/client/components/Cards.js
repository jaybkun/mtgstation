import React, {Component, PropTypes} from 'react';
import {TextField, RefreshIndicator} from 'material-ui';
import {fetchCards, clearCards} from '../actions/CardActions';
import {connect} from 'react-redux';
import Card from './Card';

const style = {
  refresh: {
    display: 'block',
    position: 'relative'
  }
};

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {search: '', selectedCard: ''};

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.viewCard = this.viewCard.bind(this);
  }

  updateCardSearch(ev, value) {
    const {dispatch} = this.props;
    this.setState({search: value});
    if (value === '') {
      this.setState({selectedCard: ''});
      dispatch(clearCards());
    } else {
      dispatch(fetchCards(value));
    }
  }

  viewCard(card) {
    this.setState({selectedCard: card});
  }

  render() {
    let noResultsMsg = null;
    if (this.props.cards.length === 0 &&
      this.state.search !== '' && !this.props.isFetching) {
      noResultsMsg = (<li>No cards match your search</li>);
    }

    let cardDiv = null;
    if (this.state.selectedCard !== {}) {
      cardDiv = <Card card={this.state.selectedCard}/>
    }

    return (
      <div>
        <div style={{float:'left', width: '25%', height:'100%'}}>
          <TextField
            id='card-search' hintText='Search Cards Here...'
            value={this.state.search} onChange={this.updateCardSearch}
          />
          <ul style={{listStyle:'none'}}>
            {this.props.cards.map(card => {
              return <li
                key={card.name}
                onClick={this.viewCard.bind(this, card)}
                style={{cursor:'pointer'}}
              >{card.name}</li>;
            })}
            {noResultsMsg}
          </ul>
        </div>
        <div style={{float:'right', width:'75%'}}>
          {this.state.search !== '' && this.state.selectedCard !== '' ? <Card card={this.state.selectedCard}/> : null}
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    cards: state.rootReducer.cards.cards,
    isFetching: state.rootReducer.cards.isFetching
  };
};

export default connect(mapStateToProps)(Cards);
