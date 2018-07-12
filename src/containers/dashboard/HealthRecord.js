import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../../components/dashboard/profiles/ProfileCard';

export class HealthRecord extends Component {
  render() {
    return (
      this.props.profile ? <ProfileCard profile={this.props.profile} /> : ''
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.currentProfile
  };
}

export default connect(mapStateToProps)(HealthRecord);
