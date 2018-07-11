import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileList from '../../components/dashboard/profiles/ProfileList';
import { loadProfiles, addProfile, updateProfile, deleteProfile, setActiveProfile } from '../../actions/profiles';

export class Profile extends Component {
  render() {
    return (
      <ProfileList
        profiles={this.props.profiles}
        addProfile={this.props.addProfile}
        updateProfile={this.props.updateProfile}
        deleteProfile={this.props.deleteProfile}
        setActiveProfile={this.props.setActiveProfile} />
    );
  }
}

Profile.propTypes = {
  profiles: PropTypes.array,
  accessToken: PropTypes.string.isRequired,
  loadProfiles: PropTypes.func.isRequired,
  addProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  setActiveProfile: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadProfiles,
    addProfile,
    updateProfile,
    deleteProfile,
    setActiveProfile
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles.profiles,
    accessToken: state.auth.accessToken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
