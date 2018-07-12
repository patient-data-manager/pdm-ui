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
    this.props.setActiveProfile(this.props.profile.id);
  }

  loadEditForm = (event) => {
    event.stopPropagation();
    this.setState({ showEditForm: true });
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
        <Button color="primary" onClick={this.loadEditForm}>
          <FontAwesomeIcon icon="edit" /> EDIT
        </Button>
      </div>
    );
  }

  renderEditForm = () => {
    if (this.state.showEditForm) {
      return (
        <ProfileForm
          deleteProfile={this.props.deleteProfile}
          saveProfile={this.props.updateProfile}
          profile={this.props.profile}
          cancel={this.handleFormCancel} />
      );
    }

    return null;
  }

  renderIcon = () => {
    const { profile } = this.props;

    if (profile.relationship === 'self') {
      return <UserStarIcon height="43" />;
    }

    return <FontAwesomeIcon icon="user-circle" />;
  }

  render() {
    const { profile, isHeader } = this.props;
    const { showEditForm } = this.state;
    const wrapperClassnames = classNames('profile-card__wrapper', { 'is-header': isHeader }, { editing: showEditForm });

    return (
      <div
        className="profile-card"
        onClick={this.setActiveProfile}
        onKeyPress={this.setActiveProfile}
        role="button"
        tabIndex={-1}>
        <div className={wrapperClassnames}>
          <div className="profile-card__info">
            <div className="profile-card__icon">
              {this.renderIcon()}
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
  isHeader: PropTypes.bool,
  alertsCount: PropTypes.number,
  updateProfile: PropTypes.func,
  deleteProfile: PropTypes.func,
  setActiveProfile: PropTypes.func
};

ProfileCard.defaultProps = {
  isHeader: false,
  alertsCount: 3 // TODO: remove when alerts working
};