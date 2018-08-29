import * as types from '../actions/types';

const defaultState = {
  providers: [],
  profileProviders: [],
  loadProviders: { isLoading: false, loadStatus: null },
  loadProfileProviders: { isLoading: false, loadStatus: null },
  linkProvider: { isLinking: false, linkStatus: null },

};

function providers(state = defaultState, action) {
  switch (action.type) {
  case types.PROVIDERS_REQUEST:
    return {
      ...state,
      loadProviders: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_PROVIDERS_SUCCESS:
    return {
      ...state,
      providers: action.providers,
      loadProviders: { isLoading: false, loadStatus: 'success' }
    };
  case types.LOAD_PROVIDERS_FAILURE:
    return {
      ...state,
      loadProviders: { isLoading: false, loadStatus: 'failure' }
    };
  case types.PROFILE_PROVIDERS_REQUEST:
    return {
      ...state,
      loadProfileProviders: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_PROFILE_PROVIDERS_SUCCESS:
    return {
      ...state,
      profileProviders: action.providers,
      loadProfileProviders: { isLoading: false, loadStatus: 'success' }
    };
  case types.LOAD_PROFILE_PROVIDERS_FAILURE:
    return {
      ...state,
      loadProfileProviders: { isLoading: false, loadStatus: 'failure' }
    };
  case types.DELETE_PROFILE_PROVIDER_FAILURE:
    return {
      ...state
    };
  case types.DELETE_PROFILE_PROVIDER_SUCCESS:
    return {
      ...state,
      profileProviders: state.profileProviders.filter(profProvider => profProvider.id !== action.profileProviderId)
    };
  case types.DELETE_PROFILE_PROVIDER_REQUEST:
    return {
      ...state
    };
  case types.LINK_PROVIDER_REQUEST:
    return {
      ...state,
      linkProvider: { isLinking: true, linkStatus: null }
    };
  case types.LINK_PROVIDER_SUCCESS:
    window.location.assign(action.redirectUri);

    return {
      ...state,
      linkProvider: { isLinking: false, linkStatus: 'success' }
    };
  case types.OAUTH_CALLBACK_SUCCESS:
    return state;
  case types.LINK_PROVIDER_FAILURE:
    return {
      ...state,
      linkProvider: { isLinking: false, linkStatus: 'failure' }
    };
  default:
    return state;
  }
}

export default providers;
