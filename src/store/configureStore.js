import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

// import unauthenticatedResponse from '../middleware/unauthenticated_response';

import rootReducer from '../reducers';

export function configureStore() {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    createLogger()
    // ,unauthenticatedResponse
  );

  let persistedState = loadState();

  // Sets up http://zalmoxisus.github.io/redux-devtools-extension/
  // eslint-disable-next-line no-underscore-dangle
  const enhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  let store = createStore(rootReducer, persistedState, enhancers(middleware));

  return store;
}

function loadState() {
  try {
    let persistedState = localStorage.getItem('hdm_state');
    if (persistedState === null) {
      return undefined;
    }
    return JSON.parse(persistedState);

  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    let persistedState = JSON.stringify(state);
    localStorage.setItem('hdm_state', persistedState);
  } catch (err) {
    console.log(err);
  }
}
