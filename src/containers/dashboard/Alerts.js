import React, { Component } from 'react';
import ProfileListRow from '../../components/dashboard/profiles/ProfileListRow';
import { connect } from 'react-redux';


export class Alert extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <div className='dashboard-body'>
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

export default connect(mapStateToProps)(Alert);
