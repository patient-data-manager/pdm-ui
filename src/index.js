import 'es6-shim';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';

import registerServiceWorker from './utils/registerServiceWorker';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import 'react-day-picker/lib/style.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';

const { store, persistor } = configureStore();
window.store = store;

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:3000';

render(
  <PersistGate loading={null} persistor={persistor}>
    <Root store={store} />
  </PersistGate>,
  document.getElementById('root')
);

registerServiceWorker();
