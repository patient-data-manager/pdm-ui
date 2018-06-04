import 'es6-shim';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { hashHistory, Router, Route } from 'react-router';
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/application.css';
import App from './containers/App';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import AuthenticatedRoutes from './containers/AuthenticatedRoutes';
import registerServiceWorker from './registerServiceWorker';
import store from './store/configureStore';
window.store=store;
let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'http://127.0.0.1:3000';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path='/' component={App}/>
      <Route component={AuthenticatedRoutes}>
      </Route>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
