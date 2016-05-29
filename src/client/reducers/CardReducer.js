import {CardActions} from '../actions/CardActions';
import assign from 'object-assign';

const cards = (state = {isFetching: false, cards:[]}, action) => {
  switch(action.type) {
    case CardActions.REQUEST_CARDS:
      return assign({}, state, {
        isFetching: true
      });
    case CardActions.RECEIVE_CARDS:
      return assign({}, state, {
        isFetching: false,
        cards: action.cards
      });
    case CardActions.CLEAR_CARDS:
      return assign({}, state, {
        isFetching: false,
        cards: []
      });
    default:
      return state;
  }
};

export default cards;