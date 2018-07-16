import * as types from './types';
import axios from 'axios';

// ------------------------- LOAD PROFILES --------------------------------- //

function requestProfiles() {
  return {
    type: types.PROFILES_REQUEST
  };
}

function loadProfilesSuccess(profiles) {
  return {
    type: types.LOAD_PROFILES_SUCCESS,
    profiles
  };
}

function loadProfilesFailure(error) {
  return {
    type: types.LOAD_PROFILES_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  };
}

function sendProfilesRequest(accessToken) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/api/v1/profiles`,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loadProfiles() {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestProfiles());

    return sendProfilesRequest(accessToken)
      .then(data => dispatch(loadProfilesSuccess(data)))
      .catch(error => dispatch(loadProfilesFailure(error)));
  };
}

// ------------------------- SET ACTIVE PROFILE ---------------------------- //

export function setActiveProfile(profileId) {
  return {
    type: types.SET_ACTIVE_PROFILE,
    profileId
  };
}

// ------------------------- ADD PROFILE ----------------------------------- //

function requestAddProfile() {
  return {
    type: types.ADD_PROFILE_REQUEST
  };
}

function addProfileSuccess(profile) {
  return {
    type: types.ADD_PROFILE_SUCCESS,
    profile
  };
}

function addProfileFailure(error) {
  return {
    type: types.ADD_PROFILE_FAILURE,
    status: error.response ? error.response.status : '',
    statusText: error.response ? error.response.statusText : ''
  };
}

function sendAddProfileRequest(profileProps, accessToken) {
  return new Promise((resolve, reject) => {
    axios.post(
      '/api/v1/profiles',
      { profile: profileProps },
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function addProfile(profileProps) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestAddProfile());

    return sendAddProfileRequest(profileProps, accessToken)
      .then(profile => dispatch(addProfileSuccess(profile)))
      .catch(error => dispatch(addProfileFailure(error)));
  };
}

// ------------------------- UPDATE PROFILE -------------------------------- //

function requestUpdateProfile() {
  return {
    type: types.UPDATE_PROFILE_REQUEST
  };
}

function updateProfileSuccess(profile) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    profile
  };
}

function updateProfileFailure(error) {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
    status: error.response ? error.response.status : '',
    statusText: error.response ? error.response.statusText : ''
  };
}

function sendUpdateProfileRequest(profile, accessToken) {
  return new Promise((resolve, reject) => {
    axios.put(
      `/api/v1/profiles/${profile.id}`,
      { profile },
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function updateProfile(profile) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestUpdateProfile());

    return sendUpdateProfileRequest(profile, accessToken)
      .then(profile => dispatch(updateProfileSuccess(profile)))
      .catch(error => dispatch(updateProfileFailure(error)));
  };
}

// ------------------------- DELETE PROFILE -------------------------------- //

function requestDeleteProfile() {
  return {
    type: types.DELETE_PROFILE_REQUEST
  };
}

function deleteProfileSuccess(profileId) {
  return {
    type: types.DELETE_PROFILE_SUCCESS,
    profileId
  };
}

function deleteProfileFailure(error) {
  return {
    type: types.DELETE_PROFILE_FAILURE,
    status: error.response ? error.response.status : '',
    statusText: error.response ? error.response.statusText : ''
  };
}

function sendDeleteProfileRequest(profileId, accessToken) {
  return new Promise((resolve, reject) => {
    axios.delete(
      `/api/v1/profiles/${profileId}`,
      { headers: { 'X-Key-Inflection': 'camel', Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function deleteProfile(profileId) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestDeleteProfile());

    return sendDeleteProfileRequest(profileId, accessToken)
      .then(profile => dispatch(deleteProfileSuccess(profileId)))
      .catch(error => dispatch(deleteProfileFailure(error)));
  };
}
