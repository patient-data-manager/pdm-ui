import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../../actions/profiles';
import * as types from '../../actions/types';

const mockProfileA = { id: 1, name: "Jane Doe" };
const mockProfileB = { id: 2, name: "John Doe" };
const mockProfileC = { id: 1, name: "Janey Doe" };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profiles actions', () => {
  // ----------------------- LOAD PROFILES --------------------------------- //
  describe('should handle loading profiles', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create LOAD_PROFILES_SUCCESS after successfully loading profiles', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: [ mockProfileA, mockProfileB ] });
      });

      const store = mockStore({ profiles: [], auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.PROFILES_REQUEST },
        { type: types.LOAD_PROFILES_SUCCESS, profiles: [ mockProfileA, mockProfileB ] }
      ];

      return store.dispatch(actions.loadProfiles()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // ----------------------- SET ACTIVE PROFILE ---------------------------- //
  describe('set active profile', () => {
    it('should create an action to set an active profile', () => {
      const expectedAction = {
        type: types.SET_ACTIVE_PROFILE,
        profileId: 2
      };

      expect(actions.setActiveProfile(2)).toEqual(expectedAction);
    });
  });

  // ----------------------- ADD PROFILE ----------------------------------- //
  describe('should handle adding a profile', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create ADD_PROFILE_SUCCESS after successfully adding a profile', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: mockProfileB });
      });

      const store = mockStore({ profiles: [ mockProfileA ], auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.ADD_PROFILE_REQUEST },
        { type: types.ADD_PROFILE_SUCCESS, profile: mockProfileB }
      ];

      return store.dispatch(actions.addProfile(mockProfileB)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // ------------------------- UPDATE PROFILE -------------------------------- //
  describe('should handle updating a profile', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create UPDATE_PROFILE_SUCCESS after successfully updating a profile', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: mockProfileC });
      });

      const store = mockStore({ profiles: [ mockProfileA ], auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.UPDATE_PROFILE_REQUEST },
        { type: types.UPDATE_PROFILE_SUCCESS, profile: mockProfileC }
      ];

      return store.dispatch(actions.updateProfile(mockProfileC)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // ------------------------- DELETE PROFILE -------------------------------- //
  describe('should handle deleting a profile', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create DELETE_PROFILE_SUCCESS after successfully deleting a profile', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: mockProfileA });
      });

      const store = mockStore({ profiles: [ mockProfileA, mockProfileB ], auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.DELETE_PROFILE_REQUEST },
        { type: types.DELETE_PROFILE_SUCCESS, profileId: 1 }
      ];

      return store.dispatch(actions.deleteProfile(mockProfileA.id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
