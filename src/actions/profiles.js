import {
  CREATE_PROFILE,
  DELETE_PROFILE
} from './types';

import axios from 'axios';

export function fetchProfiles(access_token) {
  return {
    type: CREATE_PROFILE,
    payload: axios.get('/api/v1/profiles',{access_token},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function createProfile(access_token, profile) {
  return {
    type: CREATE_PROFILE,
    payload: axios.post('/api/v1/profiles',{access_token, profile},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function updateProfile(access_token, profile) {
  return {
    type: CREATE_PROFILE,
    payload: axios.put('/api/v1/profiles/'+profile.id ,{access_token, profile},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function deleteProfile(access_token, id) {
  return {
    type: DELETE_PROFILE,
    payload: axios.delete('/api/v1/profiles'+id,{access_token},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}
