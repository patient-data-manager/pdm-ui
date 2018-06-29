import {
  LOG_IN_FULFILLED,
  LOG_OUT
} from '../actions/types';

import {
  combineReducers
} from 'redux';



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

export default combineReducers({accessToken});
