import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserCircle, faFile, faExclamationCircle, faHospital, faEdit, faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

import PrivateRoute from './PrivateRoute';
import Landing from '../components/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Profiles from './dashboard/Profiles';
import HealthRecord from './dashboard/HealthRecord';
import Alerts from './dashboard/Alerts';
import Providers from './dashboard/Providers';
import NoMatch from '../components/pages/Page404';
import OAuth from './OAuth/OAuth';

// add fontawesome icons to library
library.add(faUserCircle, faFile, faExclamationCircle, faHospital, faEdit, faPlusCircle);

// material ui theme
const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary: { light: '#85A1C2', main: '#6b8eb6', dark: '#5c7ca1', contrastText: '#fff' },
    secondary: { light: '#96A5B7', main: '#7E90A3', dark: '#6C7988', contrastText: '#fff' },
    error: { light: '#d08c9f', main: '#b66b80', dark: '#a44d65', contrastText: '#fff' }
  },
  shape: {}
});

const Root = ({ store }) => {
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <PrivateRoute path='/dashboard'>
              <Dashboard>
                <Switch>
                  <PrivateRoute path='/dashboard/profiles' component={Profiles} />
                  <PrivateRoute path='/dashboard/health-record' component={HealthRecord}/>
                  <PrivateRoute path='/dashboard/alerts' component={Alerts} />
                  <PrivateRoute path='/dashboard/providers' component={Providers} />
                 <PrivateRoute path='/oauth' component={OAuth} />
                  <Route component={NoMatch} />
                </Switch>
              </Dashboard>
            </PrivateRoute>

            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
