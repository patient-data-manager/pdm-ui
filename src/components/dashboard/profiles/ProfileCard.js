import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import computeAgeString from '../../../utils/convertToString';

import ProfileForm from './ProfileForm';
import UserStarIcon from '../../../icons/UserStarIcon';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditForm: false
    };
  }

  setActiveProfile = () => {
    if (this.props.activeProfile && this.props.activeProfile.id !== this.props.profile.id) {
      this.props.setActiveProfile(this.props.profile.id);
      this.props.loadHealthRecord(this.props.profile.id);
    }
  }

  toggleEditForm = (event) => {
    event.stopPropagation();
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  handleFormCancel = () => {
    this.setState({ showEditForm: false });
  }

  renderNameAlerts = () => {
    const { alertsCount, profile } = this.props;

    if (alertsCount > 0) {
      return (
        <Badge className="details-alerts" badgeContent={alertsCount} color="error">
          <div className="details-name">{profile.name}</div>
        </Badge>
      );
    }

    return <div className="details-name">{profile.name}</div>;
  }

  renderEditButton = () => {
    return (
      <div className="profile-card__edit-button">
        <Button color="primary" onClick={this.toggleEditForm}>
          <FontAwesomeIcon icon="edit" /> EDIT
        </Button>
      </div>
    );
  }

  renderEditForm = () => {
    if (this.state.showEditForm) {
      return (
        <ProfileForm
          profile={this.props.profile}
          deleteProfile={this.props.deleteProfile}
          saveProfile={this.props.updateProfile}
          cancel={this.handleFormCancel} />
      );
    }

    return null;
  }

  renderImage = () => {
    const { profile, activeProfile } = this.props;
    const iconClassnames = classNames('user-icon', { 'active': activeProfile && profile.id === activeProfile.id });

    if (profile.photo) {
      return <img src={profile.photo} alt="Profile" />;
    } else if (profile.relationship === 'self') {
      return <UserStarIcon height="43" className={iconClassnames} />;
    }

    return <FontAwesomeIcon icon="user-circle" className={iconClassnames} />;
  }

  setActiveProfileViaKeyboard = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      this.setActiveProfile();
    }
  }

  render() {
    const { profile, isHeader, activeProfile } = this.props;
    const { showEditForm } = this.state;
    const wrapperClassnames = classNames(
      'profile-card__wrapper',
      { 'is-header': isHeader },
      { editing: showEditForm },
      { 'active': activeProfile && profile.id === activeProfile.id }
    );

    return (
      <div className="profile-card">
        <div
          className={wrapperClassnames}
          onClick={this.setActiveProfile}
          onKeyPress={this.setActiveProfileViaKeyboard}
          role="button"
          tabIndex={-1}>
          <div className="profile-card__info">
            <div className="profile-card__image">
              {this.renderImage()}
            </div>

            <div className="profile-card__details">
              <div className="details-name-alerts">{this.renderNameAlerts()}</div>

              <div className="details-age-gender-relation">
                <div className="details-age">{computeAgeString(profile.dob)}</div>
                <div className="details-gender">{profile.gender}</div>
                <div className="details-relation">{profile.relationship}</div>
              </div>
            </div>
          </div>

          {!isHeader && this.renderEditButton()}
        </div>

        {this.renderEditForm()}
      </div>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
  activeProfile: PropTypes.object,
  isHeader: PropTypes.bool,
  alertsCount: PropTypes.number,
  updateProfile: PropTypes.func,
  deleteProfile: PropTypes.func,
  setActiveProfile: PropTypes.func,
  loadHealthRecord: PropTypes.func
};

ProfileCard.defaultProps = {
  isHeader: false,
  alertsCount: 3 // TODO: remove when alerts working
};
