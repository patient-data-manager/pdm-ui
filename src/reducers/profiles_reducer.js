import {
  CREATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_FULFILLED,
  DELETE_PROFILE_FULFILLED,
  FETCH_PROFILES_FULFILLED
} from '../actions/types';
import keyBy from 'lodash/keyBy';

function profiles(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILES_FULFILLED:
      return keyBy(action.payload.data,"id");
    case CREATE_PROFILE_FULFILLED:
       state[action.payload.data.id] = action.payload.data;
       return state;
    case UPDATE_PROFILE_FULFILLED:
        state[action.payload.data.id] = action.payload.data;
        return state;
    case DELETE_PROFILE_FULFILLED:
      delete state[action.payload.data.id];
      return state;
    default:
      return state;
  }
}

export default profiles;
