import * as React from 'react';
import {Component, PropTypes} from 'react';
import {
  TextField,
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  List,
  ListItem
} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Snackbar, CircularProgress} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/av/library-add';
import {fetchCards, clearCards} from '../actions/CardActions';
import {connect} from 'react-redux';
import {replaceCost} from '../utils/CostConverter';
import * as _ from 'lodash';
//import d3 from 'd3';

class DeckBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      deckCards: [],
      sideboard: [],
      search: '',
      snackbarOpen: false,
      message: '',
      analytics: {
        size: 0,
        lands: {
          total: 0,
          plains: 0,
          islands: 0,
          swamps: 0,
          mountains: 0,
          forests: 0,
          nonBasic: 0
        },
        creatures: 0,
        artifacts: 0,
        spells: {
          sorceries: 0,
          instants: 0,
          enchantments: 0
        },
        colors: {
          multicolor: 0,
          white: 0,
          blue: 0,
          black: 0,
          red: 0,
          green: 0,
          colorless: 0
        }
      }
    };

    this.updateCardSearch = this.updateCardSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addCard = this.addCard.bind(this);
    this.removeCards = this.removeCards.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.saveDeck = this.saveDeck.bind(this);
    this.updateAnalysis = this.updateAnalysis.bind(this);
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
    this.setState({snackbarOpen: true, message: 'Save not implemented yet'});
  }

  updateAnalysis() {
    let deckSize = this.state.deckCards.length;

    // Lands
    let plains = 0;
    let islands = 0;
    let swamps = 0;
    let mountains = 0;
    let forests = 0;
    let nonBasic = 0;

    // Non-land
    let creatures = 0;
    let instants = 0;
    let sorceries = 0;
    let enchantments = 0;
    let artifacts = 0;

    // Colors
    let white = 0;
    let blue = 0;
    let black = 0;
    let red = 0;
    let green = 0;
    let colorless = 0;
    let multicolor = 0;

    this.state.deckCards.forEach(card => {
      let isLand = false;
      // Type breakdown
      if (_.includes(card.types, 'land')) {
        isLand = true;
        if (_.includes(['plains', 'snow-covered plains'], card.name.toLowerCase())) {
          plains++;
        } else if (_.includes(['island', 'snow-covered island'], card.name.toLowerCase())) {
          islands++;
        } else if (_.includes(['swamp', 'snow-covered swamp'], card.name.toLowerCase())) {
          swamps++;
        } else if (_.includes(['mountain', 'snow-covered mountain'], card.name.toLowerCase())) {
          mountains++;
        } else if (_.includes(['forest', 'snow-covered forest'], card.name.toLowerCase())) {
          forests++;
        } else {
          nonBasic++;
        }
      } else if (_.includes(card.types, 'creature')) {
        creatures++;
      } else if (_.includes(card.types, 'instant')) {
        instants++;
      } else if (_.includes(card.types, 'sorcery')) {
        sorceries++;
      } else if (_.includes(card.types, 'enchantment')) {
        enchantments++;
      } else if (_.includes(card.types, 'artifact')) {
        artifacts++;
      }

      // Color breakdown
      if (card.colors && card.colors.length > 1 && !isLand) {
        multicolor++;
      } else {
        if (_.includes(card.colors, 'white')) {
          white++;
        } else if (_.includes(card.colors, 'blue')) {
          blue++;
        } else if (_.includes(card.colors, 'black')) {
          black++;
        } else if (_.includes(card.colors, 'red')) {
          red++;
        } else if (_.includes(card.colors, 'green')) {
          green++;
        } else {
          if (!isLand) {
            colorless++;
          }
        }
      }
    });
    const analytics = {
      size: deckSize,
      lands: {
        total: plains + islands + swamps + mountains + green + nonBasic,
        plains: plains,
        islands: islands,
        swamps: swamps,
        mountains: mountains,
        forests: forests,
        nonBasic: nonBasic
      },
      creatures: creatures,
      artifacts: artifacts,
      spells: {
        sorceries: sorceries,
        instants: instants,
        enchantments: enchantments
      },
      colors: {
        multicolor: multicolor,
        white: white,
        blue: blue,
        black: black,
        red: red,
        green: green,
        colorless: colorless
      }
    };
    this.setState({analytics: analytics}, () => {

      // let width = 150;
      // let height = 150;
      // let radius = Math.min(width, height) / 2;
      //
      // let data = [];
      // let dataColors = [];
      // _.each(this.state.analytics.colors, (value, key) => {
      //   if (value > 0) {
      //     data.push({color: key, value: value});
      //     switch (key) {
      //       case 'multicolor': dataColors.push('#D4AF37'); break;
      //       case 'white': dataColors.push('#F3F3F3'); break;
      //       case 'blue': dataColors.push('#0000FF'); break;
      //       case 'black': dataColors.push('#000000'); break;
      //       case 'red': dataColors.push('#FF0000'); break;
      //       case 'green': dataColors.push('#00FF00'); break;
      //       case 'colorless': dataColors.push('#AA00FF'); break;
      //     }
      //   }
      // });
      //
      // let color = d3.scale.ordinal()
      //   .range(dataColors);
      //
      // let arc = d3.svg.arc()
      //   .outerRadius(radius)
      //   .innerRadius(radius - 30);
      //
      // let pie = d3.layout.pie().value(c => {return c.value});
      //
      // let svg = d3.select('#color-chart')
      //   .append('svg')
      //   .attr('width', width)
      //   .attr('height', height)
      //   .append('g')
      //   .attr('id', 'colorPie')
      //   .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      //
      // let g = svg.selectAll('.arc')
      //   .data(pie(data))
      //   .enter().append('g')
      //   .attr('class', 'arc');
      //
      // g.append('path').attr('d', arc)
      //   .style('fill', d => { console.debug(d.data.color); return color(d.data.value); });
    });
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
  }

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

    let count = _.filter(this.state.deckCards, {id: newCard.id}).length;
    if (!isBasicLand && count >= 4) {
      this.setState({
        snackbarOpen: true,
        message: 'Limit of 4'
      });
    } else {
      this.setState({deckCards: [...this.state.deckCards, newCard]}, () => {
        this.updateAnalysis();
      });
    }
  }

  removeCards() {
    let newDeck = _.filter(this.state.deckCards, card => {
      return !card.selected
    });
    this.setState({deckCards: newDeck}, () => {
      this.updateAnalysis()
    });
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
            <TextField hintText="Title"/>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              onTouchTap={this.saveDeck}
              icon={<AddIcon/>}>
              Save
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>
        <div style={{float:'left'}}>
          <h4>Analysis</h4>
          <div style={{width:'100%'}}>
            <div style={{float:'left', margin: '0 16px 0 0', width: '150px'}}>
              <span style={{fontStyle:'italic', textDecoration:'underline'}}>By the Numbers</span>
              <div>
                <div>Creatures: <div style={{float:'right'}}>{this.state.analytics.creatures}</div></div>
                <div>Enchantments: <div style={{float:'right'}}>{this.state.analytics.spells.enchantments}</div></div>
                <div>Instants: <div style={{float:'right'}}>{this.state.analytics.spells.instants}</div></div>
                <div>Sorceries: <div style={{float:'right'}}>{this.state.analytics.spells.sorceries}</div></div>
                <div>Lands: <div style={{float:'right'}}>{this.state.analytics.lands.total}</div></div>
                <div>Total: <div style={{float:'right'}}>{this.state.analytics.size}</div></div>
              </div>
            </div>

            <div style={{float:'left', margin: '0 16px 0 0', width: '150px'}}>
              <span style={{fontStyle:'italic', textDecoration:'underline'}}>Land Breakdown</span>
              {this.state.analytics.lands.plains > 0 ?
                <div>Plains: <div style={{float:'right'}}>{this.state.analytics.lands.plains}</div></div> : null}
              {this.state.analytics.lands.islands > 0 ?
                <div>Islands: <div style={{float:'right'}}>{this.state.analytics.lands.islands}</div></div> : null}
              {this.state.analytics.lands.swamps > 0 ?
                <div>Swamps: <div style={{float:'right'}}>{this.state.analytics.lands.swamps}</div></div> : null}
              {this.state.analytics.lands.mountains > 0 ?
                <div>Mountains: <div style={{float:'right'}}>{this.state.analytics.lands.mountains}</div></div> : null}
              {this.state.analytics.lands.forests > 0 ?
                <div>Forests: <div style={{float:'right'}}>{this.state.analytics.lands.forests}</div></div> : null}
              {this.state.analytics.lands.nonBasic > 0 ?
                <div>NonBasic: <div style={{float:'right'}}>{this.state.analytics.lands.nonBasic}</div></div> : null}
            </div>

            <div style={{float:'left', margin: '0 16px 0 0', width: '150px'}}>
              <span style={{fontStyle:'italic', textDecoration:'underline'}}>Colors Breakdown</span>
              <div id='color-chart'></div>
            </div>
          </div>
        </div>
        <div style={{clear:'left'}}>
          <Toolbar>
            <ToolbarGroup>
              <TextField id='card-search'
                         hintText='Search by name'
                         value={this.state.search}
                         onChange={this.updateCardSearch}/>
              <RaisedButton onTouchTap={this.clearSearch}>Clear</RaisedButton>
            </ToolbarGroup>
            <ToolbarGroup>
              <RaisedButton onTouchTap={this.removeCards}>
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
                <TableRowColumn>
                  {replaceCost(card.cost)}
                </TableRowColumn>
                <TableRowColumn>{card.types}</TableRowColumn>
                <TableRowColumn>
                  {replaceCost(card.text)}
                </TableRowColumn>
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
