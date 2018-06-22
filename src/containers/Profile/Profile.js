import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'

export class Profile extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <Header />
        <Sidebar />
        <div className="Sarah">SARAHHHHHHHHH </div>
      </div>
    );
  }
}
