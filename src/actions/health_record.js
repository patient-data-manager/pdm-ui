import * as types from './types';
import axios from 'axios';

function fetchPatientEverything(accessToken, id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/Patient/' + id + '/$everything?access_token=' + accessToken, {}, {
        headers: {
          'X-Key-Inflection': 'camel',
          'Accept': 'application/json'
        }
      })
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });

}

function requestHealthRecord() {
  return {
    type: types.FETCH_PATIENT_EVERYTHING
  };
}

function requestHealthRecordSuccess(data) {
  return {
    type: types.FETCH_PATIENT_EVERYTHING_SUCCESS,
    data
  };
}

function requestHealthRecordFailure(error) {
  return {
    type: types.FETCH_PATIENT_EVERYTHING_FAILURE,
    error
  };
}

export function loadHealthRecord(id) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestHealthRecord(id));

    return fetchPatientEverything(accessToken, id)
      .then(data => dispatch(requestHealthRecordSuccess(data)))
      .catch(error => dispatch(requestHealthRecordFailure(error)));
  };
}
