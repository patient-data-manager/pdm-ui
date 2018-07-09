import * as types from './types';
import axios from 'axios';

export function fetchProfiles() {
  console.debug('fetching profiles...');
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;

    return dispatch({
      type: types.FETCH_PROFILES,
      payload: axios.get('/api/v1/profiles?access_token='+access_token,{},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  };
}

export function createProfile(profile) {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;

    return dispatch({
      type: types.CREATE_PROFILE,
      payload: axios.post('/api/v1/profiles',{access_token, profile},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  };
}

export function updateProfile(profile) {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;

    return dispatch({
      type: types.UPDATE_PROFILE,
      payload: axios.put('/api/v1/profiles/'+profile.id ,{access_token, profile},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  };
}

export function deleteProfile(id) {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;

    return dispatch({
      type: types.DELETE_PROFILE,
      payload: axios.delete('/api/v1/profiles/'+id+"?access_token="+access_token,{},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  };
}

export function setCurrentProfile(id) {
  return {
    type: types.SET_CURRENT_PROFILE,
    payload: id
  };
}
