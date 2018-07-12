import axios from 'axios';
import Promise from 'promise';

import * as types from './types';

// ------------------------- USER ------------------------------------------ //

function requestUser() {
  return {
    type: types.USER_REQUEST
  };
}

function userReceived(username) {
  return {
    type: types.USER_RECEIVED,
    username
  };
}

function sendUserRequest(accessToken) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/api/v1/users`, // TODO: test when backend works
      { access_token: accessToken },
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json' } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function getCurrentUser(accessToken) {
  return (dispatch) => {
    dispatch(requestUser());

    return sendUserRequest(accessToken)
      .then(data => dispatch(userReceived(data)))
      .catch(() => dispatch(userReceived(null)));
  };
}

// ------------------------- LOGIN ----------------------------------------- //

function requestLogin() {
  return {
    type: types.LOGIN_REQUEST
  };
}

function loginSuccess(username, accessToken, createdAt, expiresIn) {
  return {
    type: types.LOGIN_SUCCESS,
    username,
    accessToken,
    createdAt,
    expiresIn
  };
}

function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  };
}

function sendLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`/oauth/token`, { email: username, password, grant_type: "password" })
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loginUser(username, password) {
  return (dispatch) => {
    dispatch(requestLogin());

    return new Promise((resolve, reject) => {
      sendLoginRequest(username, password)
        .then(data => {
          dispatch(loginSuccess(username, data.access_token, data.created_at, data.expires_in));
          resolve();
        })
        .catch(error => {
          dispatch(loginFailure(error));
          reject();
        });
      });
      // .then(data => dispatch(getCurrentUser(data.accessToken))); // TODO: add when backend works
  };
}

export function setLoginStatus(authStatusText) {
  return {
    type: types.SET_LOGIN_STATUS,
    authStatusText
  };
}

export function resetLoginStatus() {
  return {
    type: types.RESET_LOGIN_STATUS
  };
}

// ------------------------- LOGOUT ---------------------------------------- //

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  };
}

// ------------------------- REGISTER -------------------------------------- //

function requestRegister() {
  return {
    type: types.REGISTER_REQUEST
  };
}

function registerSuccess() {
  return {
    type: types.REGISTER_SUCCESS
  };
}

function registerFailure(response) {
  return {
    type: types.REGISTER_FAILURE,
    status: response.status,
    statusText: response.statusText,
    dataErrors: response.data ? response.data.errors : []
  };
}

function sendRegisterRequest(registrationInfo) {
  return new Promise((resolve, reject) => {
    axios.post(
      '/users',
      { user: registrationInfo },
      { headers: {'X-Key-Inflection': 'camel', 'Accept': 'application/json'} })
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function registerUser(registrationInfo) {
  return (dispatch) => {
    dispatch(requestRegister());

    return new Promise((resolve, reject) => {
      sendRegisterRequest(registrationInfo)
        .then(data => {
          dispatch(registerSuccess())
          resolve();
        })
        .catch(({ response }) => {
          dispatch(registerFailure(response));
          reject();
        });
    });
  };
}

export function resetRegistrationStatus() {
  return {
    type: types.RESET_REGISTRATION_STATUS
  };
}
