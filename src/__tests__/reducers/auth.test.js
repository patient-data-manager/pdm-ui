import * as types from '../../actions/types';
import reducer from '../../reducers/auth';

describe.only('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticating: false,
      isAuthenticated: false,
      username: null,
      accessToken: null,
      authStatus: null,
      authStatusText: '',
      expiresAt: null,
      isRegistering: false,
      registrationStatus: null,
      registrationStatusText: ''
    });
  });

  // ----------------------- USER ------------------------------------------ //
  xit('should handle getting the current user', () => {
    let action = { type: types.USER_REQUEST };
    let newState = { isAuthenticating: true };
    expect(reducer([], action)).toEqual(newState);

    const previousState = { isAuthenticating: false };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.USER_RECEIVED, username: 'Test username' };
    newState = { isAuthenticating: false, isAuthenticated: true, username: 'Test username' };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- LOGIN ----------------------------------------- //
  it('should handle logging the user in', () => {
    let action = { type: types.LOGIN_REQUEST };
    let newState = { isAuthenticating: true, authStatus: null };
    expect(reducer([], action)).toEqual(newState);

    let previousState = { isAuthenticating: false, authStatus: 'Test auth status' };
    expect(reducer(previousState, action)).toEqual(newState);

    action = {
      type: types.LOGIN_SUCCESS,
      username: 'Test username',
      accessToken: 1000,
      createdAt: 2000,
      expiresIn: 3000
    };
    newState = {
      isAuthenticating: false,
      isAuthenticated: true,
      username: 'Test username',
      accessToken: 1000,
      authStatus: 'loginSuccess',
      authStatusText: 'You have been successfully logged in.',
      expiresAt: (2000 + 3000) * 1000
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.LOGIN_FAILURE, status: 'Test status', statusText: 'Test status text' };
    newState = {
      isAuthenticating: false,
      isAuthenticated: false,
      authStatus: 'loginFailure',
      authStatusText: 'Authentication Error: Test status Test status text'
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.SET_LOGIN_STATUS, authStatusText: 'new test text' };
    previousState = { isAuthenticating: true, authStatus: 'test', authStatusText: 'old test text' };
    newState = { isAuthenticating: true, authStatus: 'test', authStatusText: 'new test text' };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.RESET_LOGIN_STATUS };
    previousState = { isAuthenticating: true, authStatus: 'test', authStatusText: 'old test text' };
    newState = { isAuthenticating: false, authStatus: null, authStatusText: '' };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ------------------------- LOGOUT ---------------------------------------- //
  it('should handle logging the user out', () => {
    const action = { type: types.LOGOUT_USER };
    const newState = {
      isAuthenticating: false,
      isAuthenticated: false,
      username: null,
      accessToken: null,
      authStatus: 'logoutSuccess',
      authStatusText: 'You have been successfully logged out.',
      expiresAt: null
    };
    expect(reducer([], action)).toEqual(newState);

    const previousState = {
      isAuthenticating: false,
      isAuthenticated: true,
      username: 'Test username',
      accessToken: 1000,
      authStatus: 'logoutSuccess',
      authStatusText: 'You have been successfully logged out.',
      expiresAt: (2000 + 3000) * 1000
    };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- REGISTER -------------------------------------- //
  it('should handle registering the user', () => {
    let action = { type: types.REGISTER_REQUEST };
    let newState = { isRegistering: true, registrationStatus: null, registrationStatusText: '' };
    expect(reducer([], action)).toEqual(newState);

    let previousState = { isRegistering: false, registrationStatus: null, registrationStatusText: '' };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.REGISTER_SUCCESS };
    newState = {
      isRegistering: false,
      registrationStatus: 'registrationSuccess',
      registrationStatusText: 'You have successfully registered. Please log in.'
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = {
      type: types.REGISTER_FAILURE,
      status: 'registrationFailure',
      statusText: 'Failed registration',
      dataErrors: []
    };
    newState = {
      isRegistering: false,
      registrationStatus: 'registrationFailure',
      registrationStatusText: 'Registration Error: registrationFailure Failed registration, please try again.'
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.RESET_REGISTRATION_STATUS };
    previousState = { isRegistering: true, registrationStatus: 'test', registrationStatusText: 'test text' };
    newState = { isRegistering: false, registrationStatus: null, registrationStatusText: '' };
    expect(reducer(previousState, action)).toEqual(newState);
  });
});
