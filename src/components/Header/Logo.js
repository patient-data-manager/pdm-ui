import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {
  render() {
    return (
      <Link to="/" className="logo navbar-brand">
        <div className='navbar-logo-name'> Rosie </div>
        <div className='navbar-logo-description'> 
          <div> the </div>
          <div> HEALTH DATA </div>
          <div> MANAGER </div>
        </div>
      </Link>
    );
  }
}
