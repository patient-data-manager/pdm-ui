import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from './Nav';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Nav
          isAuthenticated={this.props.isAuthenticated}
          authUser={this.props.authUser}
          logoutUser={this.props.logoutUser} />
      </header>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authUser: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
}
