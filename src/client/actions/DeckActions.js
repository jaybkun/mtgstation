import keyMirror from 'keymirror';
import fetch from 'isomorphic-fetch';

export const DeckActions = keyMirror({
  REQUEST_SAVE_DECK: null,
  RECEIVE_SAVE_DECK: null,
  REQUEST_DECKS: null,
  REQUEST_DECK: null,
  RECEIVE_DECKS: null
});

export const requestSaveDeck = (deck) => {
  return {
    type: DeckActions.REQUEST_SAVE_DECK,
    deck
  };
};

export const receiveSaveDeck = (deck) => {
  return {
    type: DeckActions.RECEIVE_SAVE_DECK,
    deck
  };
};

export const requestDecks = () => {
  return {
    type: DeckActions.REQUEST_DECKS
  }
};

export const receiveDecks = (decks) => {
  return {
    type: DeckActions.RECEIVE_DECKS,
    decks
  };
};

export const requestDeck = (deck) => {
  return {
    type: DeckActions.REQUEST_DECKS,
    deck
  };
};

// Thunk
export const saveDeck = (deck) => {
  window.console.debug(JSON.stringify(deck));

  return (dispatch) => {
    dispatch(requestSaveDeck(deck));

    let uri = 'http://localhost:3000/api/decks';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(uri, {
      method: 'POST',
      mode: 'no-cors',
      headers: headers,
      body: JSON.stringify(deck)
    })
      .then(response => response.json())
      .then(savedDeck => {
        dispatch(receiveSaveDeck(savedDeck))
      });
  };
};

export const getDecks = () => {
  return (dispatch) => {
    dispatch(requestDecks());

    let uri = 'http://localhost:3000/api/decks';
    return fetch(uri)
      .then(response => response.json())
      .then(decks => {
        dispatch(receiveDecks(decks))
      });
  };
};

export const getDeck = (deck) => {
  return (dispatch) => {
    dispatch(requestDeck(deck));

    let uri = 'http://localhost:3000/api/decks/' + deck;
    return fetch(uri)
      .then(response => response.json())
      .then(deck => {
        dispatch(receiveDecks(deck));
      });
  };
};
