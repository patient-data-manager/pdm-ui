import {
  FETCH_PROVIDERS,
  LINK_PROVIDER,
  PROVIDE_OAUTH_TOKEN
} from './types';
import axios from 'axios';

export function fetchProviders() {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;

    return dispatch({
      type: FETCH_PROVIDERS,
      payload: axios.get('/api/v1/providers?access_token='+access_token,{},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  }
}

export function linkProvider(provider_id, profile_id) {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;
    const redirect_uri = window.location.protocol + '//' + window.location.host + '/oauth';
    const data = { access_token, provider_id, redirect_uri };
    axios.post('/api/v1/profiles/'+profile_id+'/providers', data,
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}}).then((response) => {
            window.location=response.data.redirect_uri;
          })
    }
}

export function oauthCallback(state, code) {
  return (dispatch, getState) => {
    return {
      type: PROVIDE_OAUTH_TOKEN,
      payload: axios.get('/oauth/callback?state=' + state +'&code=' + code, {},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    }
  }
}