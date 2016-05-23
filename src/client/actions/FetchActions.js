// import bluebird from 'bluebird';
import fetch from 'isomorphic-fetch';
import keyMirror from 'keymirror';

const DECK_BREW_URI = 'https://deckbrew.com/api/mtg';

export const FETCH_ACTIONS = keyMirror({
  REQUEST_CARDS: null,
  RECEIVE_CARDS: null,
  SEARCH_CARDS: null
});

function reqeustCards(cardName) {
  return {
    type: FETCH_ACTIONS.REQUEST_CARDS,
    cardName
  };
}

function receiveCards(cardName, json) {
  return {
    type: FETCH_ACTIONS.RECEIVE_CARDS,
    cardName,
    cards: json.data.children.map(card => card.name)
  };
}

export function fetchCards(cardName) {
  return dispatch => {
    dispatch(reqeustCards(cardName));
    const searchURI = DECK_BREW_URI + '/cards?name=' + cardName;
    return fetch(searchURI)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveCards(cardName, json));
      });
  };
}
