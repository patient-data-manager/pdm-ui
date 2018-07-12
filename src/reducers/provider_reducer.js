import {
  FETCH_PROVIDERS_FULFILLED,
  LINK_PROVIDER_FULFILLED,
  LOGOUT_USER
} from '../actions/types';



function providers(state = [], action) {
  console.log("PROVIDERESSSSSSSS");
  switch (action.type) {
    case FETCH_PROVIDERS_FULFILLED:

      const providers = action.payload.data;
      return providers;
    case LINK_PROVIDER_FULFILLED:
      return state;
    case  LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

export default providers;
