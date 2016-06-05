import keyMirror from 'keymirror';
import fetch from 'isomorphic-fetch';
import config from '../../config.yml';

export const CardActions = keyMirror({
  REQUEST_CARDS: null,
  RECEIVE_CARDS: null,
  CLEAR_CARDS: null,
  ADD_CARD: null,
  REMOVE_CARD: null
});

export const requestCards = (card) => {
  return {
    type: CardActions.REQUEST_CARDS,
    card
  }
};

export const receiveCards = (card, cards) => {
  return {
    type: CardActions.RECEIVE_CARDS,
    card,
    cards
  }
};

export const clearCards = () => {
  return {
    type: CardActions.CLEAR_CARDS
  }
};

// Thunks
export const fetchCards = (card) => {
  return (dispatch) => {
    dispatch(requestCards(card));

    let uri = config.mtgCardRepo + '/cards?name=' + card;
    return fetch(uri)
      .then(response => response.json())
      .then(cards => {
        dispatch(receiveCards(card, cards));
      });
  };
};