import * as types from '../../actions/types';
import reducer from '../../reducers/profiles';

describe('profiles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      profiles: [],
      activeProfileId: null,
      activeProfile: null,
      statusMessage: null,
      loadProfiles: { isLoading: false, loadStatus: null },
      addProfile: { isAdding: false, addStatus: null },
      updateProfile: { isUpdating: false, updateStatus: null },
      deleteProfile: { isDeleting: false, deleteStatus: null }
    });
  });

  // ----------------------- LOAD PROFILES -------------------------------- //
  it('should handle loading profiles', () => {
    const previousState = { loadProfiles: { isLoading: false, loadStatus: 'loaded' } };

    let action = { type: types.PROFILES_REQUEST };
    let newState = { loadProfiles: { isLoading: true, loadStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.LOAD_PROFILES_SUCCESS, profiles: ['profile 1', 'profile 2'] };
    newState = {
      profiles: ['profile 1', 'profile 2'],
      activeProfile: 'profile 1',
      loadProfiles: { isLoading: false, loadStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.LOAD_PROFILES_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = { loadProfiles: { isLoading: false, loadStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ------------------------- SET ACTIVE PROFILE -------------------------- //
  it('should handle setting an active profile', () => {
    const previousState = { profiles: [{ id: 1 }, { id: 2 }], activeProfile: { id: 1 } };

    let action = { type: types.SET_ACTIVE_PROFILE, profileId: 2 };
    let newState = { profiles: [{ id: 1 }, { id: 2 }], activeProfile: { id: 2 }, activeProfileId: 2 };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- ADD PROFILE ----------------------------------- //
  it('should handle adding a profile', () => {
    const previousState = { profiles: [], addProfile: { isAdding: false, addStatus: 'status' } };

    let action = { type: types.ADD_PROFILE_REQUEST };
    let newState = { addProfile: { isAdding: true, addStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.ADD_PROFILE_SUCCESS, profile: 'profile 1' };
    newState = { profiles: ['profile 1'], addProfile: { isAdding: false, addStatus: 'success' } };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.ADD_PROFILE_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = { profiles: [], addProfile: { isAdding: false, addStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ------------------------- UPDATE PROFILE ------------------------------ //
  it('should handle updating a profile', () => {
    const previousState = {
      profiles: [{ id: 1, name: 'john' }],
      statusMessage: 'status',
      updateProfile: { isUpdating: false, updateStatus: 'status' }
    };

    let action = { type: types.UPDATE_PROFILE_REQUEST };
    let newState = {
      statusMessage: null,
      updateProfile: { isUpdating: true, updateStatus: null }
    };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.UPDATE_PROFILE_SUCCESS, profile: { id: 1, name: 'jane' } };
    newState = {
      profiles: [{ id: 1, name: 'jane' }],
      statusMessage: 'status',
      updateProfile: { isUpdating: false, updateStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.UPDATE_PROFILE_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = {
      profiles: [{ id: 1, name: 'john' }],
      statusMessage: 'Update failed. Test status message.',
      updateProfile: { isUpdating: false, updateStatus: 'failure' }
    };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- DELETE PROFILE ----------------------------------- //
  it('should handle deleting a profile', () => {
    const previousState = { profiles: [{ id: 1 }], deleteProfile: { isDeleting: false, deleteStatus: 'status' } };

    let action = { type: types.DELETE_PROFILE_REQUEST };
    let newState = { statusMessage: null, deleteProfile: { isDeleting: true, deleteStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.DELETE_PROFILE_SUCCESS, profileId: '1' };
    newState = {
      profiles: [],
      statusMessage: 'Deleted profile with ID: 1',
      deleteProfile: { isDeleting: false, deleteStatus: 'success' } };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.DELETE_PROFILE_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = {
      profiles: [{ id: 1 }],
      statusMessage: 'Delete failed. Test status message.',
      deleteProfile: { isDeleting: false, deleteStatus: 'failure' }
    };
    expect(reducer(previousState, action)).toEqual(newState);
  });
});
