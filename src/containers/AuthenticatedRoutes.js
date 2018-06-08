import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login/Login'

class AuthenticatedRoutes extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return this.props.children;
    } else {
      return (
        <Login />
      );
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser.accessToken && state.currentUser.accessToken.access_token ? true: false,
  };
}

AuthenticatedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object
};

export default connect(mapStateToProps)(AuthenticatedRoutes);
