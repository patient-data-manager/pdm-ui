import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import * as types from '../actions/types';

const defaultState = {
  profiles: [],
  activeProfileId: null,
  activeProfile: null,
  statusMessage: null,
  loadProfiles: { isLoading: false, loadStatus: null },
  addProfile: { isAdding: false, addStatus: null },
  updateProfile: { isUpdating: false, updateStatus: null },
  deleteProfile: { isDeleting: false, deleteStatus: null }
};

const persistConfig = {
  key: 'profiles',
  storage: storageSession,
  whitelist: ['activeProfileId']
};

function profiles(state = defaultState, action) {
  let profileIndex, newProfiles, activeProfile;

  switch (action.type) {
    case types.PROFILES_REQUEST:
      return {
        ...state,
        loadProfiles: { isLoading: true, loadStatus: null }
      };
    case types.LOAD_PROFILES_SUCCESS:
      activeProfile = action.profiles[0] || null;
      if (state.activeProfileId) {
        let activeProfileIdx = action.profiles.findIndex((profile) => profile.id === state.activeProfileId);
        if (activeProfileIdx >= 0) {
          activeProfile = action.profiles[activeProfileIdx];
        }
      }

      return {
        ...state,
        profiles: action.profiles,
        activeProfile,
        activeProfileId: activeProfile ? activeProfile.id : null,
        loadProfiles: { isLoading: false, loadStatus: 'success' }
      };
    case types.LOAD_PROFILES_FAILURE:
      return {
        ...state,
        loadProfiles: { isLoading: false, loadStatus: 'failure' }
      };
    case types.SET_ACTIVE_PROFILE:
      activeProfile = state.profiles.find(profile => profile.id === action.profileId);

      return {
        ...state,
        activeProfile,
        activeProfileId: activeProfile ? activeProfile.id : null
      };
    case types.ADD_PROFILE_REQUEST:
      return {
        ...state,
        addProfile: { isAdding: true, addStatus: null }
      };
    case types.ADD_PROFILE_SUCCESS:
      return {
        ...state,
        addProfile: { isAdding: false, addStatus: 'success' },
        profiles: state.profiles.concat(action.profile)
      };
    case types.ADD_PROFILE_FAILURE:
      return {
        ...state,
        addProfile: { isAdding: false, addStatus: 'failure' }
      };
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        statusMessage: null,
        updateProfile: { isUpdating: true, updateStatus: null }
      };
    case types.UPDATE_PROFILE_SUCCESS:
      profileIndex = state.profiles.findIndex(profile => profile.id === action.profile.id);
      newProfiles = state.profiles.slice();
      newProfiles[profileIndex] = action.profile;

      return {
        ...state,
        profiles: newProfiles,
        updateProfile: { isUpdating: false, updateStatus: 'success' }
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        statusMessage: `Update failed. ${action.statusText}.`,
        updateProfile: { isUpdating: false, updateStatus: 'failure' }
      };
    case types.DELETE_PROFILE_REQUEST:
      return {
        ...state,
        statusMessage: null,
        deleteProfile: { isDeleting: true, deleteStatus: null }
      };
    case types.DELETE_PROFILE_SUCCESS:
      profileIndex = state.profiles.findIndex(profile => profile.id === action.profileId);
      newProfiles = state.profiles.slice();
      newProfiles.splice(profileIndex, 1);

      return {
        ...state,
        profiles: newProfiles,
        statusMessage: `Deleted profile with ID: ${action.profileId}`,
        deleteProfile: { isDeleting: false, deleteStatus: 'success' }
      };
    case types.DELETE_PROFILE_FAILURE:
      return {
        ...state,
        statusMessage: `Delete failed. ${action.statusText}.`,
        deleteProfile: { isDeleting: false, deleteStatus: 'failure' }
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, profiles);
