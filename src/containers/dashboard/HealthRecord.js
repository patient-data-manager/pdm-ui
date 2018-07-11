import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileListRow from '../../components/dashboard/profiles/ProfileListRow';

export class HealthRecord extends Component {
  render() {
    return (
      this.props.profile ? <ProfileListRow profile={this.props.profile} /> : ''
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.currentProfile
  };
}

export default connect(mapStateToProps)(HealthRecord);
