import React, {Component, PropTypes} from 'react';
import {TextField, RefreshIndicator, RaisedButton} from 'material-ui';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {List, ListItem} from 'material-ui';
import {fetchCards, clearCards} from '../actions/CardActions';
import {connect} from 'react-redux';
import Card from './Card';

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedCard: ''
    };

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.viewCard = this.viewCard.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  clearSearch() {
    const {dispatch} = this.props;
    dispatch(clearCards());
    this.setState({search: ''});
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
      noResultsMsg = <ListItem primaryText='No cards match your search'/>
    }

    let cardDiv = null;
    if (this.state.selectedCard !== {}) {
      cardDiv = <Card card={this.state.selectedCard}/>
    }

    return (
      <div style={{width: '100%'}}>
        <div style={{margin: '16px 32px'}}>
          <div>
            <TextField id='card-search' hintText='Search Cards Here...' fullWidth={true}
                       value={this.state.search} onChange={this.updateCardSearch}/>
            <RaisedButton
              onTapTouch={this.clearSearch}
              icon={<ClearIcon/>} />
          </div>
          <List>
            {this.props.cards.map(card => {
              return <ListItem
                key={card.name}
                onTouchTap={this.viewCard.bind(this, card)}
                style={{cursor:'pointer'}}
                primaryText={card.name}/>
            })}
          </List>
          <div style={{display:'flex', margin: '8px 16px 8px 0'}}>
            {this.state.selectedCard.name ? <Card card={this.state.selectedCard}/> : null}
          </div>
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

Cards.defaultProps = {
  cards: [],
  isFetching: false
};

const mapStateToProps = (state) => {
  return {
    cards: state.rootReducer.cards.cards,
    isFetching: state.rootReducer.cards.isFetching
  };
};

export default connect(mapStateToProps)(Cards);
