import React,{Component} from 'react';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          <li>MTG Station</li>
          <li>Powered by <a href="https://facebook.github.io/react/">React</a></li>
          <li>Card search powered by <a href="https://deckbrew.com/">DeckBrew</a></li>
        </ul>
      </div>
    );
  }
}

export default About;