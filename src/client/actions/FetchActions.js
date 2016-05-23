import bluebird from 'bluebird';
import fetch from 'isomorphic-fetch';
bluebird.promisifyAll(fetch);
import keyMirror from 'keymirror';

const DECK_BREW_URI = 'https://deckbrew.com/api/mtg';

export const FETCH_ACTIONS = keyMirror({
  SEARCH_CARDS: null,
  RECEIVE_CARDS: null
});

/**
 * Fetchs the cards
 * @param name - name of the card, fuzzy match is used
 * @returns {{type: null, name: *}}
 */
export function searchCards(name) {
  return {
    type: FETCH_ACTIONS.SEARCH_CARDS,
    name
  };
}

/**
 * Fires when cards are returned from the call
 * @param name - value that was searched
 * @param json - json results from deck brew
 * @returns {{type: null, cards: *}}
 */
export function receiveCards(name, json) {
  return {
    type: FETCH_ACTIONS.RECEIVE_CARDS,
    name,
    cards: json.data.children.map(child => child.name)
  };
}

/**
 * Performs the fetch
 * @param name - blah
 * @returns {function()}
 */
function fetchCards(name) {
  return dispatch => {
    dispatch(searchCards(name));
    const uri = DECK_BREW_URI + '/cards?name=' + name;
    return fetch(uri)
      .then(response => response.json())
      .then(json => dispatch(receiveCards(name, json)));
  };
}
