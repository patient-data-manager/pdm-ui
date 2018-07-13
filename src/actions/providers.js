import * as types from './types';
import axios from 'axios';

export function fetchProviders() {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    return dispatch({
      type: types.FETCH_PROVIDERS,
      payload: axios.get(
        '/api/v1/providers',
        { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
      )
    });
  }
}

export function linkProvider(provider_id, profile_id) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const redirect_uri = `${window.location.protocol}//${window.location.host}/oauth`;
    const data = { provider_id, redirect_uri };

    axios.post(
      `/api/v1/profiles/${profile_id}/providers`,
      data,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then((response) => {
        window.location = response.data.redirect_uri;
      });
  }
}

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
