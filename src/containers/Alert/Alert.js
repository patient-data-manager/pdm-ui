import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'

export class Alert extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            Insert alerts content here.
          </div>
        </div>
      </div>
    );
  }
}

export default Alert;
