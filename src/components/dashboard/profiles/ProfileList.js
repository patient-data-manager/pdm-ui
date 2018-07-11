import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import FlipMove from 'react-flip-move';

import ProfileListRow from './ProfileListRow';
import ProfileForm from './ProfileForm';

export default class ProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = { new: false };
  }

  loadNewForm = () => {
    this.setState({new: true});
  }

  handleFormCancel = () => {
    this.setState({new: false});
  }

  newProfile() {
    return {
      name: "New Profile",
      dob: null,
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      gender: null
    };
  }

  renderProfilesList = () => {
    return this.props.profiles.map((profile) => {
      return (
        <ProfileListRow
          key={profile.id}
          deleteProfile={this.props.deleteProfile}
          updateProfile={this.props.updateProfile}
          profile={profile}
          setActiveProfile={this.props.setActiveProfile}
          showEditBtn={true} />
      );
    });
  }

  renderNewForm = (showNewForm) => {
    if (showNewForm) {
      return (
        <div className='profile-new-form'>
          <div className='profile-new-form-title'>
            <div className='profile-row-icon'>
              <FontAwesome name='user-circle' />
            </div>

            <div className='profile-new-form-label'>
              Create new profile:
            </div>
          </div>

          <ProfileForm
            saveProfile={this.props.addProfile}
            profile={this.newProfile()}
            cancel={this.handleFormCancel}
            deleteProfile={this.props.deleteProfile} />
        </div>
      );
    } else {
      return (
        <div className='profile-new-btn'>
          <button onClick={ this.loadNewForm }>
            <FontAwesome name='plus-circle' /> NEW
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='profile-list-container'>
        <FlipMove className='profile-flip-list'>
          {this.renderProfilesList()}
        </FlipMove>

        <div className='profile-new-container'>
          {this.renderNewForm(this.state.new)}
        </div>
      </div>
    );
  }
}

ProfileList.propTypes = {
  profiles: PropTypes.array,
  addProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  setActiveProfile: PropTypes.func.isRequired
}
