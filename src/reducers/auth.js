import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import * as types from '../actions/types';

const defaultState = {
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
};

const persistConfig = {
  key: 'auth',
  storage: storageSession,
  whitelist: ['isAuthenticated', 'accessToken', 'username', 'expiresAt'],
  migrate(state) {
    if (state && state.isAuthenticated) {
      const expiresAt = new Date(state.expiresAt);
      if (expiresAt < new Date()) {
        state.accessToken = null;
        state.isAuthenticated = false;
        state.expiresAt = null;
        state.username = null;
      }
    }

    return Promise.resolve(state);
  }
};

function auth(state = defaultState, action) {
  const isAuthenticated = action.username != null;

  let authStatusText, registrationStatusText;

  switch (action.type) {
  case types.USER_REQUEST:
    return {
      ...state,
      isAuthenticating: true
    };
  case types.USER_RECEIVED:
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated,
      username: action.username
    };
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isAuthenticating: true,
      authStatus: null
    };
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: true,
      username: action.username,
      accessToken: action.accessToken,
      authStatus: 'loginSuccess',
      authStatusText: 'You have been successfully logged in.',
      expiresAt: (action.createdAt + action.expiresIn) * 1000
    };
  case types.LOGIN_FAILURE:
    authStatusText = `Authentication Error: ${action.status} ${action.statusText}`;
    if (action.status === 401) {
      authStatusText = 'Invalid credentials, please try again.';
    }

    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: false,
      authStatus: 'loginFailure',
      authStatusText
    };
  case types.SET_LOGIN_STATUS:
    return {
      ...state,
      authStatusText: action.authStatusText
    };
  case types.RESET_LOGIN_STATUS:
    return {
      ...state,
      isAuthenticating: false,
      authStatus: null,
      authStatusText: ''
    };
  case types.LOGOUT_USER:
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: false,
      username: null,
      accessToken: null,
      authStatus: 'logoutSuccess',
      authStatusText: 'You have been successfully logged out.',
      expiresAt: null
    };
  case types.REGISTER_REQUEST:
    return {
      ...state,
      isRegistering: true,
      registrationStatus: null,
      registrationStatusText: ''
    };
  case types.REGISTER_SUCCESS:
    return {
      ...state,
      isRegistering: false,
      registrationStatus: 'registrationSuccess',
      registrationStatusText: 'You have successfully registered. Please log in.'
    };
  case types.REGISTER_FAILURE:
    registrationStatusText = `Registration Error: ${action.status} ${action.statusText}, please try again.`;
    if (action.status === 422) {
      registrationStatusText = formatServerErrors(action.dataErrors);
    }

    return {
      ...state,
      isRegistering: false,
      registrationStatus: 'registrationFailure',
      registrationStatusText
    };
  case types.RESET_REGISTRATION_STATUS:
    return {
      ...state,
      isRegistering: false,
      registrationStatus: null,
      registrationStatusText: ''
    };
  default:
    return state;
  }
}

export default persistReducer(persistConfig, auth);

function formatServerErrors(errors) {
  let fieldErrors = [];

  Object.keys(errors).forEach((property) => {
    let field = (property[0].toUpperCase() + property.slice(1)).replace('_', ' ');
    fieldErrors.push(errors[property].map((error) => `${field} ${error}`));
  });

  return fieldErrors.join(', ');
}
