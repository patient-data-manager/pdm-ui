import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <a className="logo navbar-brand" href="/">
        <div className='navbar-logo-name'> Rosie </div>
        <div className='navbar-logo-description'> 
          <div> the </div>
          <div> HEALTH DATA </div>
          <div> MANAGER </div>
        </div>
      </a>
    );
  }
}

Logo.displayName = 'Logo';
