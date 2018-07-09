import * as types from '../actions/types';

function profiles(state = [], action) {
  switch (action.type) {
    case types.FETCH_PROFILES_FULFILLED:
      const profiles = action.payload.data;
      profiles.currentProfile = profiles[0];
      return profiles;
    case types.CREATE_PROFILE_FULFILLED:
      const newState = [].concat(state);
      newState.push(action.payload.data);
      return newState;
    case types.UPDATE_PROFILE_FULFILLED:
      var foundIndex = state.findIndex(e => e.id === action.payload.data.id);
      state[foundIndex] = action.payload.data;
      return [].concat(state);
    case types.DELETE_PROFILE_FULFILLED:
      return state.filter(e => e.id !== action.payload.data.id);
    case types.SET_CURRENT_PROFILE:
      foundIndex = state.findIndex(e => e.id === action.payload);
      const filtered = state.filter(e => e.id !== action.payload);
      const updated = [state[foundIndex]].concat(filtered);
      updated.currentProfile = state[foundIndex];
      return updated;
    case types.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

export default profiles;
