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

function linkProviderSuccess(redirectUri) {
  return {
    type: types.LINK_PROVIDER_SUCCESS,
    redirectUri
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

    axios.post(
      `/api/v1/profiles/${profileId}/providers`,
      data,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data.redirect_uri))
      .catch(error => reject(error));
  });
}

export function linkProvider(providerId, profileId) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestLinkProviders());

    return sendLinkProviderRequest(providerId, profileId, accessToken)
      .then(uri => dispatch(linkProviderSuccess(uri)))
      .catch(error => dispatch(linkProviderFailure(error)));
  };
}

// ------------------------- OAUTH CALLBACK -------------------------------- //

function requestOauthCallback() {
  return {
    type: types.OAUTH_CALLBACK_REQUEST
  };
}

function oauthCallbackSuccess(redirectUri) {
  return {
    type: types.OAUTH_CALLBACK_SUCCESS,
    redirectUri
  };
}

function oauthCallbackFailure(error) {
  return {
    type: types.OAUTH_CALLBACK_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  };
}

function sendOauthCallbackRequest(state, code) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/oauth/callback?state=${state}&code=${code}`,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json' } }
    )
      .then(result => resolve(result.data.redirect_uri))
      .catch(error => reject(error));
  });
}

export function oauthCallback(state, code) {
  return (dispatch) => {
    dispatch(requestOauthCallback());

    return sendOauthCallbackRequest(state, code)
      .then(uri => dispatch(oauthCallbackSuccess(uri)))
      .catch(error => dispatch(oauthCallbackFailure(error)));
  };
}
