import {
  FETCH_PROVIDERS,
  LINK_PROVIDER
} from './types';
import {getToken} from '../lib/utils.js';
import axios from 'axios';

export function fetchProviders() {
  let access_token = getToken();
  return {
    type: FETCH_PROVIDERS,
    payload: axios.get('/api/v1/providers?access_token='+access_token,{},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function linkProvider(provider_id, profile_id) {
  let access_token = getToken();
  let redirect_uri = window.location.protocol + '//' + window.location.host + '/oauth';
  let data = { access_token, provider_id, redirect_uri };
  axios.post('/api/v1/profiles/'+profile_id+'/providers', data,
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}}).then((response) => {
          window.location=response.data.redirect_uri;
        })
}
