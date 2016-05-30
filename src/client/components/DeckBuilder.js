import React, {Component, PropTypes} from 'react';
import {TextField, Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton, List, ListItem, FloatingActionButton} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Snackbar, CircularProgress} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/av/library-add';
import {fetchCards, clearCards} from '../actions/CardActions';
import {connect} from 'react-redux';
import {replaceCost} from '../utils/CostConverter';

class DeckBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      deckCards: [],
      sideboard: [],
      search: '',
      snackbarOpen: false,
      message: ''
    };

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addCard = this.addCard.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.saveDeck = this.saveDeck.bind(this);
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

  clearSearch() {
    this.setState({search: '', selectedCard: ''});
    const {dispatch} = this.props;
    dispatch(clearCards());
  }

  saveDeck() {

  }

  handleRowSelect(rows) {
    let newDeck = [];
    if (rows === 'all' || rows === 'none') {
      newDeck = this.state.deckCards.map(card => {
        card.selected = (rows === 'all');
        return card;
      });
    } else {
      newDeck = _.map(this.state.deckCards, ((card, idx) => {
        card.selected = _.includes(rows, idx);
        return card;
      }));
    }
    this.setState({deckCards: newDeck});
  };

  addCard(card) {
    let newCard = _.cloneDeep(card);
    let isBasicLand = false;
    newCard.selected = false;

    // Check if basic land
    if (newCard.supertypes) {
      if (_.includes(newCard.supertypes, 'basic') && _.includes(newCard.types, 'land')) {
        isBasicLand = true;
      }
    }

    if (!isBasicLand) {
      let count = _.filter(this.state.deckCards, {id: newCard.id}).length;
      if (count < 4) {
        this.setState({deckCards: [...this.state.deckCards, newCard]});
      } else {
        this.setState({
          snackbarOpen: true,
          message: 'Limit of 4'
        })
      }
    } else {
      this.setState({deckCards: [...this.state.deckCards, newCard]});
    }
  }

  removeSelected() {
    let newDeck = _.filter(this.state.deckCards, card => { return !card.selected });
    this.setState({deckCards: newDeck});
  }

  handleRequestClose() {
    this.setState({
      snackbarOpen: false,
      message: ''
    });
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text='Deck Builder'/>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton mini={true} icon={<AddIcon/>}>
              Save
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>
        <TextField hintText="Title" />
        <div style={{float:'right'}}>
          <h4>Analysis</h4>
          <div>Size: {this.state.deckCards.length}</div>
        </div>
        <div style={{clear:'right'}}>
          <Toolbar>
            <ToolbarGroup>
              <TextField id='card-search'
                         hintText='Search by name'
                         value={this.state.search}
                         onChange={this.updateCardSearch}/>
              <RaisedButton onTouchTap={this.clearSearch}>Clear</RaisedButton>
            </ToolbarGroup>
            <ToolbarGroup>
              <RaisedButton onTouchTap={this.removeSelected}>
                Remove
              </RaisedButton>
            </ToolbarGroup>
          </Toolbar>
          {this.props.isFetching ? <CircularProgress /> :
            <List>
              {this.props.cards.map((card, i) => {
                return <ListItem onTouchTap={this.addCard.bind(this, card)} key={i} primaryText={card.name}/>;
              })}
            </List>}
        </div>
        <Table multiSelectable={true}
               selectable={true}
               fixedHeader={true}
               onRowSelection={this.handleRowSelect}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Cost</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Text</TableHeaderColumn>
              <TableHeaderColumn>Subtype</TableHeaderColumn>
              <TableHeaderColumn>P/T</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {this.state.deckCards.map((card, index) => {
              return (<TableRow key={index} selected={card.selected}>
                <TableRowColumn>{card.name}</TableRowColumn>
                <TableRowColumn><div dangerouslySetInnerHTML={replaceCost(card.cost)}/></TableRowColumn>
                <TableRowColumn>{card.types}</TableRowColumn>
                <TableRowColumn><div dangerouslySetInnerHTML={replaceCost(card.text)}/></TableRowColumn>
                <TableRowColumn>{card.subtypes}</TableRowColumn>
                <TableRowColumn>{card.power}/{card.toughness}</TableRowColumn>
              </TableRow>)
            })}
          </TableBody>
        </Table>

        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          autoHideDuration={2000}
          handleActionTouchTap={this.handleRequestClose}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

DeckBuilder.propTypes = {
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

export default connect(mapStateToProps)(DeckBuilder);
