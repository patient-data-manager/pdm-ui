import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'

export default class Profile extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <Sidebar />
          <div className="dashboard-content">
            Insert profile content here.
          </div>
        </div>
      </div>
    );
  }
}
