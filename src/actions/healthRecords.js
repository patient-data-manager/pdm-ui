import axios from 'axios';
import * as types from './types';

// ------------------------- LOAD HEALTH RECORD ---------------------------- //

function requestHealthRecord() {
  return {
    type: types.HEALTH_RECORD_REQUEST
  };
}

function loadHealthRecordSuccess(healthRecord) {
  return {
    type: types.LOAD_HEALTH_RECORD_SUCCESS,
    healthRecord
  };
}

function loadHealthRecordFailure(error) {
  return {
    type: types.LOAD_HEALTH_RECORD_FAILURE,
    error
  };
}

function sendHealthRecordRequest(accessToken, id) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/api/v1/Patient/${id}/$everything?access_token=${accessToken}`,
      { headers: { 'X-Key-Inflection': 'camel', 'Accept': 'application/json' } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loadHealthRecord(id) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestHealthRecord(id));

    return sendHealthRecordRequest(accessToken, id)
      .then(data => dispatch(loadHealthRecordSuccess(data)))
      .catch(error => dispatch(loadHealthRecordFailure(error)));
  };
}

// ------------------------- RECEIVE HEALTH RECORD VIA PUSH ---------------- //

function pushedHealthRecord() {
  return {
    type: types.RECEIVE_HEALTH_RECORD_PUSH_REQUEST
  };
}

export function receiveHealthRecord(data) {
  return (dispatch) => {
    dispatch(pushedHealthRecord(data));
    dispatch(loadHealthRecordSuccess(data));
  };
}

// ------------------------- UPLOAD DOCUMENT ------------------------------- //

function requestUploadDocument() {
  return {
    type: types.UPLOAD_DOCUMENT_REQUEST
  };
}

function uploadDocumentSuccess(documentFile) {
  return {
    type: types.UPLOAD_DOCUMENT_SUCCESS,
    uploadedDocument: documentFile
  };
}

function uploadDocumentFailure(error) {
  return {
    type: types.UPLOAD_DOCUMENT_FAILURE,
    error
  };
}

function sendUploadDocumentRequest(accessToken, profileId, documentFile) {
  let formData = new FormData();
  formData.set('uploaded_document[profile_id]', profileId);
  formData.append('uploaded_document[document]', documentFile, documentFile.name);

  return new Promise((resolve, reject) => {
    axios({
      url: '/api/pilot/uploaded_documents',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Key-Inflection': 'camel',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function uploadDocument(documentFile) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const activeProfileId = getState().profiles.activeProfileId;

    dispatch(requestUploadDocument());

    return sendUploadDocumentRequest(accessToken, activeProfileId, documentFile)
      .then(data => dispatch(uploadDocumentSuccess(data)))
      .catch(error => dispatch(uploadDocumentFailure(error)))
      .then(() => dispatch(loadDocuments()));
  };
}

// ------------------------- LOAD DOCUMENTS -------------------------------- //

function requestLoadDocuments() {
  return {
    type: types.LOAD_DOCUMENTS_REQUEST
  };
}

function loadDocumentsSuccess(uploadedDocuments) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    uploadedDocuments
  };
}

function loadDocumentsFailure(error) {
  return {
    type: types.LOAD_DOCUMENTS_FAILURE,
    error
  };
}

function sendLoadDocumentsRequest(accessToken, profileId) {
  return new Promise((resolve, reject) => {
    axios.get(
      '/api/pilot/uploaded_documents',
      {
        params: { profile_id: profileId },
        headers: {
          'X-Key-Inflection': 'camel',
          'Accept': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loadDocuments() {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const activeProfileId = getState().profiles.activeProfileId;

    dispatch(requestLoadDocuments());

    return sendLoadDocumentsRequest(accessToken, activeProfileId)
      .then(data => dispatch(loadDocumentsSuccess(data)))
      .catch(error => dispatch(loadDocumentsFailure(error)));
  };
}
