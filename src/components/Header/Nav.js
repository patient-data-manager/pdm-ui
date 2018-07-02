import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo from './Logo';

export default class Nav extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  renderUserMenu() {
    return(
      <li role="presentation" className="nav-item dropdown">
        <a
          href="/"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
          {this.props.authUser} <span className="caret"></span>
        </a>

        <ul className="dropdown-menu">
          <li><button onClick={this.handleLogout}>Logout</button></li>
        </ul>
      </li>
    );
  }

  renderLoginMenu(){
    return(
      <li role="presentation" className="nav-item dropdown">
        <Link to="/login">Login</Link>
      </li>
    );
  }

  render() {
    return (
      <nav className="nav navbar navbar-expand-sm  fixed-top">
        <Logo />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          </li>
          {this.props.isAuthenticated ? this.renderUserMenu() : this.renderLoginMenu()}
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authUser: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
}
