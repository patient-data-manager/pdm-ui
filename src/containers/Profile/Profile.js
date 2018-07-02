import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'
import ProfileList from './ProfileList'

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {profiles: []};
  }

  render() {
    return (
      <div className='content-wrapper'>
        <Header isAuthenticated={false} authUser={null} logoutUser={() => {}} />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            <ProfileList profiles={this.state.profiles}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
