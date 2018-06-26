import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'
import ProfileList from './ProfileList'

export class Profile extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            <ProfileList />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
