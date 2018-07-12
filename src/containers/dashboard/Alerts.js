import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../../components/dashboard/profiles/ProfileCard';

export class Alert extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <div className='dashboard-body'>
          <div className='dashboard-content'>
            {this.props.profile ? <ProfileCard profile={this.props.profile}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.avtiveProfile
  };
}

export default connect(mapStateToProps)(Alert);
