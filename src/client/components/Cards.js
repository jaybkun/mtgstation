import React, {Component, PropTypes} from 'react';
import {TextField} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {fetchCards, clearCards} from '../actions/CardActions';
import {connect} from 'react-redux';
import MtgCard from './Card';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '75%',
    height: '80%',
    overflowY: 'auto',
    marginBottom: 24
  }
};

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedCard: undefined,
      expandResults: false
    };

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.viewCard = this.viewCard.bind(this);
    this.hideCard = this.hideCard.bind(this);
  }

  updateCardSearch(ev, value) {
    const {dispatch} = this.props;
    this.setState({search: value, expandResults: true});
    if (value === '') {
      this.setState({selectedCard: ''});
      dispatch(clearCards());
    } else {
      dispatch(fetchCards(value));
    }
  }

  viewCard(card) {
    this.setState({selectedCard: card, expandResults: false});
  }

  hideCard() {
    this.setState({selectedCard: undefined});
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={{margin: '16px 32px'}}>
          <TextField id='card-search' hintText='Search Cards Here...' fullWidth={true}
                     value={this.state.search} onChange={this.updateCardSearch}/>
          <Card expanded={this.state.expandResults} expandable={true}>
            <CardHeader
              onTouchTap={() => this.setState({expandResults: !this.state.expandResults})}
              title={'Results: ' + this.props.cards.length}
              showExpandableButton={true}/>
            <CardText expandable={true}>
              <GridList cellHeight={200} style={styles.gridList} cols={3}>
                {this.props.cards.map(card => {
                  return (
                    <GridTile
                      key={card.id}
                      title={card.name}
                      onTouchTap={this.viewCard.bind(this, card)}>
                      <img src={card.editions[0].image_url}/>
                    </GridTile>)
                })}
              </GridList>
            </CardText>
          </Card>
          <div style={{margin:'16px 0'}}>
            {typeof this.state.selectedCard !== 'undefined' ? <MtgCard card={this.state.selectedCard}/> : null}
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
