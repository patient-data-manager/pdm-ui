import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';
import Button from '@material-ui/core/Button';

import { loadProfiles, addProfile, updateProfile, deleteProfile, setActiveProfile } from '../../actions/profiles';

import ProfileCard from '../../components/dashboard/profiles/ProfileCard';
import ProfileForm from '../../components/dashboard/profiles/ProfileForm';

export class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = { showNewForm: false };
  }

  loadNewForm = () => {
    this.setState({ showNewForm: true });
  }

  handleFormCancel = () => {
    this.setState({ showNewForm: false });
  }

  newProfile() {
    return {
      name: 'New Profile',
      dob: null,
      first_name: '',
      last_name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      gender: null,
      relationship: ''
    };
  }

  renderProfilesList = () => {
    return this.props.profiles.map((profile) => {
      return (
        <ProfileCard
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
        <div className='profiles__new-form'>
          <div className='profiles__new-form-title'>
            <div className='profiles__new-form-icon'>
              <FontAwesomeIcon icon="user-circle" />
            </div>

            <div className='profiles__new-form-label'>
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
    }

    return (
      <div className="profiles__new-button">
        <Button color="primary" onClick={this.loadNewForm}>
          <FontAwesomeIcon icon="plus-circle" />NEW
        </Button>
      </div>
    );
  }

  render() {
    const { showNewForm } = this.state;

    return (
      <div className='profiles'>
        <FlipMove className='profiles__flip-list'>
          {this.renderProfilesList()}
        </FlipMove>

        <div className='profiles__new'>
          {this.renderNewForm(showNewForm)}
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
