import React, { Component } from 'react';
// import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <a className="logo navbar-brand" href="/">
        <span><img className="header-logo"  src="assets/images/logo-3x.png" width="25px" /></span>
        <span>Health Data Manager</span>
      </a>
    );
  }
}

Logo.displayName = 'Logo';
