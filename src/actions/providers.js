import * as types from './types';
import axios from 'axios';

// ------------------------- LOAD PROVIDERS -------------------------------- //

function requestProviders() {
  return {
    type: types.PROVIDERS_REQUEST
  };
}

function loadProvidersSuccess(providers) {
  return {
    type: types.LOAD_PROVIDERS_SUCCESS,
    providers
  };
}

function loadProvidersFailure(error) {
  return {
    type: types.LOAD_PROVIDERS_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  };
}

function sendProvidersRequest(accessToken) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/api/v1/providers`,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loadProviders() {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestProviders());

    return sendProvidersRequest(accessToken)
      .then(data => dispatch(loadProvidersSuccess(data)))
      .catch(error => dispatch(loadProvidersFailure(error)));
  };
}

// ------------------------- LINK PROVIDER --------------------------------- //

function requestLinkProviders() {
  return {
    type: types.LINK_PROVIDER_REQUEST
  };
}

function linkProviderSuccess() {
  return {
    type: types.LINK_PROVIDER_SUCCESS
  };
}

function linkProviderFailure(error) {
  return {
    type: types.LINK_PROVIDER_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  };
}

function sendLinkProviderRequest(providerId, profileId, accessToken) {
  return new Promise((resolve, reject) => {
    const redirectUri = `${window.location.protocol}//${window.location.host}/oauth`;
    const data = { provider_id: providerId, redirect_uri: redirectUri };

    axios.get(
      `/api/v1/profiles/${profileId}/providers`,
      data,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => window.location = result.data.redirect_uri)
      .catch(error => reject(error));
  });
}

export function linkProvider(providerId, profileId) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestLinkProviders());

    return sendLinkProviderRequest(providerId, profileId, accessToken)
      .then(data => dispatch(linkProviderSuccess()))
      .catch(error => dispatch(linkProviderFailure(error)));
  };
}

// ---------------

// export function linkProvider(provider_id, profile_id) {
//   return (dispatch, getState) => {
//     const accessToken = getState().auth.accessToken;
//     const redirect_uri = `${window.location.protocol}//${window.location.host}/oauth`;
//     const data = { provider_id, redirect_uri };

//     axios.post(
//       `/api/v1/profiles/${profile_id}/providers`,
//       data,
//       { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization:
//`Bearer ${accessToken}` } }
//     )
//       .then((response) => {
//         // window.location = response.data.redirect_uri;
//       });
//   }
// }

export function oauthCallback(state, code) {
  return (dispatch, getState) => {
    return {
      type: types.PROVIDE_OAUTH_TOKEN,
      payload: axios.get(
        `/oauth/callback?state=${state}&code=${code}`,
        { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json' } }
      )
    };
  }
}
