import {
  FETCH_CURRENT_USER,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  UPDATE_USER
} from './types';

import axios from 'axios';

export function fetchCurrentUser(access_token) {
  return {
    type: FETCH_CURRENT_USER,
    payload: axios.get('/api/v1/users',{access_token},
     {headers: {'X-Key-Inflection': 'camel',
        'Accept': 'application/json'}})
  };
}

export function logIn(user, successHandler=null, failureHandler=null) {

  const postPromise = axios.post('/oauth/token',
                      user,
                      {headers: {'X-Key-Inflection': 'camel', 'Accept': 'application/json'}});
  if (failureHandler) {
    postPromise.catch(failureHandler);
  }
  if (successHandler) {
    postPromise.then(successHandler);
  }
  return {
    type: LOG_IN,
    payload: postPromise
  };
}
export function logOut() {
  return {
    type: LOG_OUT,
    payload: null
  };
}

export function signUp(user, successHandler=null, failureHandler=null) {

  const postPromise = axios.post('/users',
                      {user},
                      {headers: {'X-Key-Inflection': 'camel', 'Accept': 'application/json'}});
  if (failureHandler) {
    postPromise.catch(failureHandler);
  }
  if (successHandler) {
    postPromise.then(successHandler);
  }
  return {
    type: SIGN_UP,
    payload: postPromise
  };
}

export function updateUser(user, access_token, successHandler=null, failureHandler=null) {
  const postPromise = axios.put('/users',
                      user, access_token,
                      {headers: {'X-Key-Inflection': 'camel', 'Accept': 'application/json'}});
  if (failureHandler) {
    postPromise.catch(failureHandler);
  }
  if (successHandler) {
    postPromise.then(successHandler);
  }
  return {
    type: UPDATE_USER,
    payload: postPromise
  };
}
