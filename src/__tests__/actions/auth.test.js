import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../../actions/auth';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  // ----------------------- USER ------------------------------------------ //
  describe('get current user', () => { // TODO: add when backend works
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    xit('sends a GET request to find the current user', () => {
      const store = mockStore({});
      const username = 'email@email.com';

      moxios.stubs.track({
        url: '/api/v1/users',
        method: 'GET',
        response: { status: 200, response: { username } }
      });

      const expectedActions = [
        { type: types.USER_REQUEST },
        { type: types.USER_RECEIVED, username }
      ];

      return store.dispatch(actions.getCurrentUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    xit('sends a USER_RECEIVED action with a null username if the request fails', () => {
      const store = mockStore({});

      moxios.stubs.track({
        url: '/api/v1/users',
        method: 'GET',
        response: { status: 403, response: {} }
      });

      const expectedActions = [
        { type: types.USER_REQUEST },
        { type: types.USER_RECEIVED, username: null }
      ];

      return store.dispatch(actions.getCurrentUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // ----------------------- LOGIN ----------------------------------------- //
  describe('logging in', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('dispatches a LOGIN_SUCCESS action upon a successful login attempt', () => {
      const store = mockStore({});
      const username = 'email@email.com';
      const password = 'password';
      const accessToken = '1234';
      const createdAt = 1530893688;
      const expiresIn = 7200;

      moxios.stubs.track({
        url: '/oauth/token',
        method: 'POST',
        response: {
          status: 200,
          response: {
            username,
            access_token: accessToken,
            created_at: createdAt,
            expires_in: expiresIn
          }
        }
      });

      const expectedActions = [
        { type: types.LOGIN_REQUEST },
        { type: types.LOGIN_SUCCESS, username, accessToken, createdAt, expiresIn }
      ];

      return store.dispatch(actions.loginUser(username, password)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches a LOGIN_FAILURE action upon an unsuccessful login attempt', () => {
      const store = mockStore({});
      const username = 'email@email.com';
      const password = 'password';

      moxios.stubs.track({
        url: '/oauth/token',
        method: 'POST',
        response: { status: 401, statusText: 'Unauthorized' }
      });

      const expectedActions = [
        { type: types.LOGIN_REQUEST },
        { type: types.LOGIN_FAILURE, status: 401, statusText: 'Unauthorized' }
      ];

      return store.dispatch(actions.loginUser(username, password)).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches a SET_LOGIN_STATUS action upon successful setting of login status', () => {
      const store = mockStore({});
      const expectedActions = [{ type: types.SET_LOGIN_STATUS }];

      store.dispatch(actions.setLoginStatus());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches a RESET_LOGIN_STATUS action upon successful resetting of login status', () => {
      const store = mockStore({});
      const expectedActions = [{ type: types.RESET_LOGIN_STATUS }];

      store.dispatch(actions.resetLoginStatus());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // ----------------------- LOGOUT ---------------------------------------- //
  describe('logging out', () => {
    it('dispatches a LOGOUT_USER action upon successful logout', () => {
      const store = mockStore({});
      const expectedActions = [{ type: types.LOGOUT_USER }];

      store.dispatch(actions.logoutUser());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // ------------------------- REGISTER -------------------------------------- //
  describe('registering', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('dispatches a REGISTER_SUCCESS action upon a successful register attempt', () => {
      const store = mockStore({});
      const mockRegistrationInfo = {
        email: 'email@email.com',
        first_name: 'First',
        last_name: 'Last',
        password: 'abcdef',
        password_confirmation: 'abcdef'
      };

      moxios.stubs.track({
        url: '/users',
        method: 'POST',
        response: { status: 200 }
      });

      const expectedActions = [
        { type: types.REGISTER_REQUEST },
        { type: types.REGISTER_SUCCESS }
      ];

      return store.dispatch(actions.registerUser(mockRegistrationInfo)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches a REGISTER_FAILURE action upon an unsuccessful registration attempt', () => {
      const store = mockStore({});
      const mockRegistrationInfo = {
        email: 'email@email.com',
        first_name: 'First',
        last_name: 'Last',
        password: 'abcdef',
        password_confirmation: 'abcdef'
      };

      const errors = { email: ["can't be blank"] };

      moxios.stubs.track({
        url: '/users',
        method: 'POST',
        response: {
          status: 401,
          statusText: 'Unauthorized',
          response: { errors }
        }
      });

      const expectedActions = [
        { type: types.REGISTER_REQUEST },
        { type: types.REGISTER_FAILURE, status: 401, statusText: 'Unauthorized', dataErrors: errors  }
      ];

      return store.dispatch(actions.registerUser(mockRegistrationInfo)).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches a RESET_REGISTRATION_STATUS action upon successful resetting of registration status', () => {
      const store = mockStore({});
      const expectedActions = [{ type: types.RESET_REGISTRATION_STATUS }];

      store.dispatch(actions.resetRegistrationStatus());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
