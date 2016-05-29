import React,{Component} from 'react';

class Decks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Decks
        {this.props.children}
      </div>
    )
  }
}

export default Decks;
