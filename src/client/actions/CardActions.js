import keymirror from 'key-mirror';

export const CardActions = keymirror({
  FETCH_CARDS: null,
  ADD_CARD: null,
  REMOVE_CARD: null
});

export const addCard = (card, deck) => {
  return {
    type: CardActions.ADD_CARD,
    card: card,
    deck: deck
  };
};
