import {
  CREATE_PROFILE,
  DELETE_PROFILE
} from './types';
import {getToken} from '../lib/utils.js';
import axios from 'axios';

export function fetchProfiles() {
  let access_token = getToken();
  return {
    type: FETCH_PROFILES,
    payload: axios.get('/api/v1/profiles?access_token='+access_token,{},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function createProfile(profile) {
  let access_token = getToken();
  return {
    type: CREATE_PROFILE,
    payload: axios.post('/api/v1/profiles',{access_token, profile},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function updateProfile(profile) {
  let access_token = getToken();
  return {
    type: UPDATE_PROFILE,
    payload: axios.put('/api/v1/profiles/'+profile.id ,{access_token, profile},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function deleteProfile(id) {
  let access_token = getToken();
  return {
    type: DELETE_PROFILE,
    payload: axios.delete('/api/v1/profiles/'+id+"?access_token="+access_token,{},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}
