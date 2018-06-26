import 'es6-shim';
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router, Route } from 'react-router';

import App from './containers/App';
import Alert from './containers/Alert/Alert';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import HealthRecord from './containers/HealthRecord/HealthRecord';
import Profile from './containers/Profile/Profile';
import _Provider from './containers/Provider/Provider';
import Register from './containers/Register/Register';
import AuthenticatedRoutes from './containers/AuthenticatedRoutes';
import registerServiceWorker from './registerServiceWorker';
import { configureStore, saveState } from './store/configureStore';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';

let store = configureStore();
window.store=store;

store.subscribe(() => {
  saveState(store.getState());
});

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:3000';

render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path='/' component={App}/>
      <Route path='/profiles' component={Profile}/>
      <Route component={AuthenticatedRoutes}>
        <Route path='/logout' component={Logout}/>
        <Route path='/dashboard' component={Dashboard}/>
        {/* <Route path='/profiles' component={Profile}/> */}
        <Route path='/health-record' component={HealthRecord}/>
        <Route path='/alerts' component={Alert}/>
        <Route path='/providers' component={_Provider}/>
      </Route>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
