import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'
import ProfileListRow from '../../containers/Profile/ProfileListRow'
import { connect } from 'react-redux';

export class Provider extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            {this.props.profile ? <ProfileListRow profile={this.props.profile}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    profile: state.profiles.currentProfile
  };
}


export default connect(mapStateToProps)(Provider);
