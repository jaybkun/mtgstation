import {combineReducers} from 'redux';
import assign from 'object-assign';
import {FETCH_ACTIONS} from '../actions/FetchActions';

function cards(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_ACTIONS.SEARCH_CARDS:
      return assign({}, state, {
        isFetching: true
      });
    case FETCH_ACTIONS.RECEIVE_CARDS:
      return assign({}, state, {
        isFetching: false,
        items: action.cards
      });
    default:
      return state;
  }
}

function cardsByName(state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIONS.SEARCH_CARDS:
      return assign({}, state, {
        [action.name]: cards(state[action.name], action)
      });
    default:
      return state;
  }
}

export default combineReducers({
  cardsByName
});
