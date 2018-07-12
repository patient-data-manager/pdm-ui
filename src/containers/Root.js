import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import PrivateRoute from './PrivateRoute';
import Landing from '../components/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './Dashboard';
import Profile from './Profile/Profile';
import HealthRecord from './HealthRecord/HealthRecord';
import OAuth from './OAuth/OAuth';
import Alert from './Alert/Alert';
import _Provider from './Provider/Provider';
import NoMatch from '../components/Pages/Page404';

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
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/health-record' component={HealthRecord}/>
            <PrivateRoute path='/profiles' component={Profile} />
            <PrivateRoute path='/alerts' component={Alert} />
            <PrivateRoute path='/providers' component={_Provider} />
            <PrivateRoute path='/oauth' component={OAuth}/>
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
