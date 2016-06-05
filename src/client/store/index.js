import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    rootReducer,
    routing: routerReducer
  });

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history)
      )
    )
  )
}
