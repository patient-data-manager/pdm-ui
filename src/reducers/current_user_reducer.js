import {
  FETCH_CURRENT_USER_FULFILLED,
  LOG_IN_FULFILLED,
  LOG_OUT,
  CREATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_FULFILLED,
  DELETE_PROFILE_FULFILLED,
  FETCH_PROFILES_FULFILLED
} from '../actions/types';

import {
  combineReducers
} from 'redux';


function profiles(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILES_FULFILLED:
      // need to find default profile and set it if not set
      // need to set current profile if not set
      return action.payload.data;
    case CREATE_PROFILE_FULFILLED:
      // add new profile to state
    case UPDATE_PROFILE_FULFILLED:
      // update the existing state with the updated profile
    case DELETE_PROFILE_FULFILLED:
      // remove the profile from the state
    default:
      return state;
  }
}


function user(state = {}, action) {
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

export default combineReducers({profiles,accessToken,user})
