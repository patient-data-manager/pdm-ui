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

function sortProfiles(profiles, activeProfileId) {
  let sortedProfiles = profiles.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (activeProfileId) {
    let activeProfileIndex = sortedProfiles.findIndex(profile => profile.id === activeProfileId);
    if (activeProfileIndex !== -1) {
      let activeProfile = sortedProfiles.splice(activeProfileIndex, 1)[0];
      sortedProfiles.unshift(activeProfile);
    }
  }

  return sortedProfiles;
}

function profiles(state = defaultState, action) {
  let profileIndex, profiles, activeProfile, activeProfileId, activeProfileIdx;

  switch (action.type) {
  case types.PROFILES_REQUEST:
    return {
      ...state,
      loadProfiles: { isLoading: true, loadStatus: null }
    };
  case types.LOAD_PROFILES_SUCCESS:
    activeProfile = action.profiles[0];
    if (state.activeProfileId) {
      activeProfileIdx = action.profiles.findIndex((profile) => profile.id === state.activeProfileId);
      if (activeProfileIdx >= 0) {
        activeProfile = action.profiles[activeProfileIdx];
      }
    }

    return {
      ...state,
      profiles: sortProfiles(action.profiles, activeProfile ? activeProfile.id : null),
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
      profiles: sortProfiles(state.profiles, activeProfile ? activeProfile.id : null),
      activeProfile,
      activeProfileId: activeProfile ? activeProfile.id : null
    };
  case types.ADD_PROFILE_REQUEST:
    return {
      ...state,
      addProfile: { isAdding: true, addStatus: null }
    };
  case types.ADD_PROFILE_SUCCESS:
    activeProfile = state.activeProfile;
    if (activeProfile == null) activeProfile = action.profile;

    return {
      ...state,
      addProfile: { isAdding: false, addStatus: 'success' },
      profiles: sortProfiles(state.profiles.concat(action.profile), activeProfile ? activeProfile.id : null),
      activeProfile,
      activeProfileId: activeProfile ? activeProfile.id : null
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
    profiles = state.profiles.slice();
    profileIndex = profiles.findIndex(profile => profile.id === action.profile.id);
    profiles[profileIndex] = action.profile;

    activeProfile = state.activeProfile;
    if (activeProfile && activeProfile.id === action.profile.id) {
      activeProfile = action.profile;
    }

    return {
      ...state,
      profiles: sortProfiles(profiles, state.activeProfile ? state.activeProfile.id : null),
      activeProfile,
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
    profiles = state.profiles.slice();
    profiles.splice(profileIndex, 1);

    activeProfile = state.activeProfile;
    activeProfileId = state.activeProfileId;
    if (activeProfileId === action.profileId) {
      activeProfile = profiles[0];
      activeProfileId = activeProfile ? activeProfile.id : null;
    }

    return {
      ...state,
      profiles: sortProfiles(profiles, activeProfileId),
      activeProfile,
      activeProfileId,
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
