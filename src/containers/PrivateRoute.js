import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';

import { setLoginStatus } from '../actions/auth';

class PrivateRoute extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return (
        <Route {...this.props} />
      );
    }
    return <Route path={this.props.path} render={props => {
      this.props.setLoginStatus('You must be logged in to access this page.');
      return <Redirect to="/login" />;
    }} />;
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLoginStatus
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
