import React, {Component, PropTypes} from 'react';
import {
  TextField, IconMenu, IconButton, MenuItem, Toolbar, ToolbarGroup,
  ToolbarSeparator, ToolbarTitle, RaisedButton, List, ListItem
} from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
      search: ''
    };

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
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
    this.setState({search: '', slectedCard: ''});
    const {dispatch} = this.props;
    dispatch(clearCards());
  }

  addCard(card) {
    this.setState({deckCards: [...this.state.deckCards, card]});
  }

  removeCard(card) {

  }

  render() {
    return (
      <div>
        <h3>Deck Builder</h3>
        <TextField
          hintText="Title"
        />
        <div style={{float:'right'}}>
          <h4>Analysis</h4>
          <div>Size: {this.state.deckCards.length}</div>
        </div>
        <div style={{clear:'right'}}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <TextField id='card-search'
                         hintText='Search by name'
                         value={this.state.search}
                         onChange={this.updateCardSearch}/>
              <RaisedButton
                onClick={this.clearSearch}>Clear</RaisedButton>
            </ToolbarGroup>
          </Toolbar>
          <List>
            {this.props.cards.map((card, i) => {
              return <ListItem onClick={this.addCard.bind(this, card)} key={i} primaryText={card.name}/>;
            })}
          </List>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Cost</TableHeaderColumn>
                  <TableHeaderColumn>Type</TableHeaderColumn>
                  <TableHeaderColumn>Color</TableHeaderColumn>
                  <TableHeaderColumn>Text</TableHeaderColumn>
                  <TableHeaderColumn>P/T</TableHeaderColumn>  
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.deckCards.map((card, i) => {
                  return (
                    <TableRow key={card.name + '_' + i}>
                      <TableRowColumn>{card.name}</TableRowColumn>
                      <TableRowColumn><div dangerouslySetInnerHTML={replaceCost(card.cost)}/></TableRowColumn>
                      <TableRowColumn>{card.types}</TableRowColumn>
                      <TableRowColumn>{card.colors}</TableRowColumn>
                      <TableRowColumn>{card.text}</TableRowColumn>
                      <TableRowColumn>{card.power}/{card.toughness}</TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
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
