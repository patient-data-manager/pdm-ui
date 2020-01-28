import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import PrivateRoute from './PrivateRoute';
import Landing from './Landing';
import TokenActionCableProvider from './TokenActionCableProvider';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Profiles from './dashboard/Profiles';
import HealthRecord from './dashboard/HealthRecord';
import UploadRecords from './dashboard/UploadRecords';
import Alerts from './dashboard/Alerts';
import Providers from './dashboard/Providers';
import NoMatch from '../components/error-pages/Page404';
import OAuth from './OAuth/OAuth';

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
    primary: { light: '#d4e4f6', main: '#6b8eb6', dark: '#5c7ca1', contrastText: '#fff' },
    action: { selected: '#d4e4f6' }
  },
  shape: {}
});

const websocketURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://127.0.0.1:3000/cable';

const Root = ({ store }) => {
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/"><Landing /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/register"><Register /></Route>

            <PrivateRoute path="/oauth"><OAuth /></PrivateRoute>
            <PrivateRoute path="/dashboard">
              <TokenActionCableProvider url={websocketURL}>
                <Dashboard>
                  <Switch>
                    <PrivateRoute path="/dashboard/profiles"><Profiles /></PrivateRoute>
                    <PrivateRoute path="/dashboard/health-record"><HealthRecord /></PrivateRoute>
                    <PrivateRoute path="/dashboard/upload-records"><UploadRecords /></PrivateRoute>
                    <PrivateRoute path="/dashboard/alerts"><Alerts /></PrivateRoute>
                    <PrivateRoute path="/dashboard/providers"><Providers /></PrivateRoute>
                    <Route><NoMatch /></Route>
                  </Switch>
                </Dashboard>
              </TokenActionCableProvider>
            </PrivateRoute>

            <Route><NoMatch /></Route>
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
