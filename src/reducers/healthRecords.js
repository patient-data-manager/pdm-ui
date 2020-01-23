import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import * as types from '../actions/types';

const defaultState = {
  healthRecord: {},
  uploadedDocuments: [],
  statusMessage: null,
  loadHealthRecord: { isLoading: false, loadStatue: null },
  uploadDocument: { isUploading: false, uploadStatus: null },
  loadDocuments: { isLoading: false, loadStatus: null }
};

const persistConfig = {
  key: 'healthRecord',
  storage: storageSession
};

function groupData(bundle) {
  const groups = {};
  if (!bundle.entry) return groups;

  bundle.entry.forEach((entry) => {
    let resource = entry.resource;
    groups[resource.resourceType] = groups[resource.resourceType] || [];
    groups[resource.resourceType].push(resource);
  });

  return groups;
}

function healthRecord(state = defaultState, action) {
  switch (action.type) {
  case types.HEALTH_RECORD_REQUEST:
    return {
      ...state,
      loadHealthRecord: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_HEALTH_RECORD_SUCCESS:
    return {
      ...state,
      healthRecord: groupData(action.healthRecord),
      loadHealthRecord: { isLoading: false, loadStatus: 'success' }
    };
  case types.LOAD_HEALTH_RECORD_FAILURE:
    return {
      ...state,
      loadHealthRecord: { isLoading: false, loadStatus: 'failure' }
    };
  case types.UPLOAD_DOCUMENT_REQUEST:
    return {
      ...state,
      uploadDocument: { isUploading: true, loadStatus: null }
    };
  case types.UPLOAD_DOCUMENT_SUCCESS:
    return {
      ...state,
      uploadDocument: { isUploading: false, loadStatus: 'success' }
    };
  case types.UPLOAD_DOCUMENT_FAILURE:
    return {
      ...state,
      uploadDocument: { isUploading: false, loadStatus: 'failure' }
    };
  case types.LOAD_DOCUMENTS_REQUEST:
    return {
      ...state,
      loadDocuments: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_DOCUMENTS_SUCCESS:
    return {
      ...state,
      uploadedDocuments: action.uploadedDocuments,
      loadDocuments: { isLoading: false, loadStatus: 'success' }
    };
  case types.LOAD_DOCUMENTS_FAILURE:
    return {
      ...state,
      loadDocuments: { isLoading: false, loadStatus: 'failure' }
    };
  default:
    return state;
  }
}

export default persistReducer(persistConfig, healthRecord);
