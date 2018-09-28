import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://www.mitre.org" target="_blank" rel="nofollow noopener noreferrer">
          <img className="logo-mitre" src="/assets/images/landing/landing-mitre.png" alt="mitre logo" />
        </a>
      </footer>
    );
  }
}
