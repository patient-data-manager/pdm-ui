import * as types from '../actions/types';

function providers(state = [], action) {
  switch (action.type) {
    case types.FETCH_PROVIDERS_FULFILLED:
      return action.payload.data;
    case types.LINK_PROVIDER_FULFILLED:
      return state;
    case types.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

export default providers;
