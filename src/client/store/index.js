import React from 'react';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {createDevTools} from 'redux-devtools'; // TODO make this conditional
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import {routerReducer, routerMiddleware} from 'react-router-redux';

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='trl-h' changePositionKey='ctrl-q'>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
);

export function configureStore (history, initialState) {
  const reducer = combineReducers({
    routing: routerReducer
  });

  let devTools = [];
  if (typeof document !== 'undefined') {
    devTools = [DevTools.instrument()];
  }

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  );
}
