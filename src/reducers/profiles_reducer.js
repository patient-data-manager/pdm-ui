import {
  CREATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_FULFILLED,
  DELETE_PROFILE_FULFILLED,
  FETCH_PROFILES_FULFILLED,
  SET_CURRENT_PROFILE,
  LOG_OUT
} from '../actions/types';



function profiles(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILES_FULFILLED:
      const profiles = action.payload.data;
      profiles.currentProfile = profiles[0];
      return profiles;
    case CREATE_PROFILE_FULFILLED:
      const newState = [].concat(state);
      newState.push(action.payload.data);
      return newState;
    case UPDATE_PROFILE_FULFILLED:
      console.log(action.payload.data);
      var foundIndex = state.findIndex(e => e.id == action.payload.data.id);
      state[foundIndex] = action.payload.data;
      return [].concat(state);
    case DELETE_PROFILE_FULFILLED:
      return state.filter(e => e.id !== action.payload.data.id);
    case SET_CURRENT_PROFILE:
      var foundIndex = state.findIndex(e => e.id == action.payload);
      const filtered = state.filter(e => e.id !== action.payload);
      const updated = [state[foundIndex]].concat(filtered);
      updated.currentProfile = state[foundIndex];
      return updated;
    case  LOG_OUT:
      return null;
    default:
      return state;
  }
}

export default profiles;
