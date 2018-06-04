import {
  FETCH_CURRENT_USER_FULFILLED,
  LOG_IN_FULFILLED,
  LOG_OUT
} from '../actions/types';

import {
  combineReducers
} from 'redux';


function profile(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_FULFILLED:
      return action.payload.data;
    case LOG_OUT:
      // In this case we want to blank out currentUser because our session has been invalidated.
      // This will force the user to log back in.
      return {};
    default:
      return state;
  }
}

function accessToken(state = {}, action) {
  switch (action.type) {
    case LOG_IN_FULFILLED:
      return action.payload.data;
    case LOG_OUT:
      return null
    default:
      return state;
  }
}

export default combineReducers({profile,accessToken})
