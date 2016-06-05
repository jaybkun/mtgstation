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

  return (dispatch) => {
    dispatch(requestSaveDeck(deck));

    let uri = 'localhost/api/decks';
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: deck
    })
      .then(response => response.json())
      .then(deck => {
        dispatch(receiveSaveDeck(deck))
      });
  };
};

export const getDecks = () => {
  return (dispatch) => {
    dispatch(requestDecks());

    let uri = 'localhost/api/decks';
    return fetch(uri)
      .then(response => response.json())
      .then(decks => {
        dispatch(receiveDecks(decks))
      });
  };
};

export const getDeck = (deck) => {
  /*
   return (dispatch) => {
   dispatch(requestCards(card));

   let uri = 'https://api.deckbrew.com/mtg/cards?name=' + card;
   return fetch(uri)
   .then(response => response.json())
   .then(cards => {
   dispatch(receiveCards(card, cards));
   });
   };*/
};
