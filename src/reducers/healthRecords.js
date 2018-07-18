import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import * as types from '../actions/types';

const defaultState = {
  healthRecord: {},
  statusMessage: null,
  loadHealthRecord: { isLoading: false, loadStatus: null }
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
    case types.HEALTH_RECORD_SUCCESS:
      return {
        ...state,
        healthRecord: groupData(action.healthRecord),
        loadHealthRecord: { isLoading: false, loadStatus: 'success' }
      };
    case types.HEALTH_RECORD_FAILURE:
      return {
        ...state,
        loadHealthRecord: { isLoading: false, loadStatus: 'failure' }
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, healthRecord);
