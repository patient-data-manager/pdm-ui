import * as types from '../actions/types';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const defaultState = {
  healthRecord: {},
  statusMessage: null,
  loadHealthRecord: {
    isLoading: false,
    loadStatus: null
  },
};

const persistConfig = {
  key: 'healthRecord',
  storage: storageSession
};

function groupData(bundle) {
  const groups = {}
  if (!bundle.entry) {
    return groups
  };
  bundle.entry.map(function(entry) {
    let resource = entry.resource;
    groups[resource.resourceType] = groups[resource.resourceType] || []
    groups[resource.resourceType].push(resource)
  })
  return groups
}




function healthRecord(state = defaultState, action) {
  let healthRecord, loadHealthRecord;

  switch (action.type) {
    case types.FETCH_PATIENT_EVERYTHING:
      return {
        ...state,
        loadHealthRecord: {
          isLoading: true,
          loadStatus: null
        }
      };
    case types.FETCH_PATIENT_EVERYTHING_SUCCESS:
      healthRecord = groupData(action.data);
      return {
        ...state,
        healthRecord,
        loadHealthRecord: {
          isLoading: false,
          loadStatus: 'success'
        }
      };
    case types.FETCH_PATIENT_EVERYTHING_FAILURE:
      return {
        ...state,
        loadHealthRecord: {
          isLoading: false,
          loadStatus: 'failure'
        }
      };

    default:
      return state;
  }
}

export default persistReducer(persistConfig, healthRecord);
