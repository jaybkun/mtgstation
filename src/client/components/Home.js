import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cards: []
    };

    this.fetchCards = this.fetchCards.bind(this);
  }

  fetchCards(ev) {
    this.setState({search: ev.target.value});
  }

  render() {
    return (
      <div>
        Home
        <div>
          <input type='text' value={this.state.search} onChange={this.fetchCards} />
          <ul>
            {this.state.cards.map(card => {
              return <li>{card.name}</li>;
            })}
          </ul>
          <div>
            {this.state.search}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
