import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'

export class HealthRecord extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            Insert health record content here.
          </div>
        </div>
      </div>
    );
  }
}

export default HealthRecord;
