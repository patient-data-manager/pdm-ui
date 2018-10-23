import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import isValid from '../../../utils/isValid';
import isValidAndNotEmpty from '../../../utils/isValidAndNotEmpty';
import ProviderModal from './ProviderModal';

export default class ProviderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsExpanded: true,
      healthRecordAccess: 'full',
      modalIsOpen: false
    };
  }

  toggleDetails = () => {
    this.setState({ detailsExpanded: !this.state.detailsExpanded });
  }

  handleAccessChange = (event) => {
    // TO-DO: change access levels in DB not just state
    this.setState({ healthRecordAccess: event.target.value });
  }

  openAccessModal = (event) => {
    if (event.target.value === 'custom \u25bc') this.setState({ modalIsOpen: true });
  }

  closeAccessModal = () => {
    this.setState({ modalIsOpen: false });
  }

  formatDate = (date) => {
    if (isValid(date)) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

  renderAddress = (provider) => {
    let addressLines = [];
    if (isValid(provider.street)) {
      let addressBlocks = provider.street.split(',');
      addressBlocks.forEach((block) => {
        if (isValidAndNotEmpty(block)) addressLines.push(block.trim());
      });
    }

    let cityTownZip = '';
    if (isValidAndNotEmpty(provider.city)) cityTownZip += provider.city + ' ';
    if (isValidAndNotEmpty(provider.state)) cityTownZip += provider.state;
    if (isValidAndNotEmpty(provider.zip)) cityTownZip += ', ' + provider.zip;
    if (isValidAndNotEmpty(cityTownZip)) addressLines.push(cityTownZip);

    if (addressLines.length === 0) return null;

    return addressLines.map((line, index) => {
      return <div key={index} className="address-line">{line}</div>;
    });
  }

  renderCollapseExpandIcon = () => {
    if (this.state.detailsExpanded) {
      return <FontAwesomeIcon icon="chevron-down" />;
    } else {
      return <FontAwesomeIcon icon="chevron-right" />;
    }
  }

  renderLogo = () => {
    if (!isValid(this.props.provider.logo)) return null;

    return (
      <div className="details-logo">
        <img className="details-logo__img" src={"data:image/jpeg;base64," + this.props.provider.logo} alt="" />
      </div>
    );
  }

  renderRadioButton = (value) => {
    return (
      <FormControlLabel
        className="access-radio"
        control={
          <Radio
            checked={this.state.healthRecordAccess === value}
            onChange={this.handleAccessChange}
            onClick={this.openAccessModal}
            value={value}
            name="access"
            aria-label={value}
          />
        }
        label={value}
      />
    );
  }

  renderDetails = () => {
    if (!this.state.detailsExpanded) return null;

    return (
      <div className="provider-card__details">
        <div className="details-info-logo">
          <div className="details-info">
            <div className="details-info__added-on">
              <div className="info-key">Added on</div>
              <div className="info-value">{this.formatDate(this.props.provider.addedOn)}</div>
            </div>

            <div className="details-info__last-updated">
              <div className="info-key">Last updated</div>
              <div className="info-value">{this.formatDate(this.props.provider.lastUpdated)}</div>
            </div>

            <div className="details-info__address">
              <div className="info-key">Address</div>
              <div className="info-value">{this.renderAddress(this.props.provider)}</div>
            </div>
          </div>
          {this.renderLogo()}
        </div>

        <div className="details-permissions">
          <div className="permissions-title">Permissions</div>
          <div className="permissions-content">
            <div className="permissions-content__label">Health Record Access</div>
            <div className="permissions-content__form-group access-group">
              {this.renderRadioButton('none')}
              {this.renderRadioButton('full')}
              {this.renderRadioButton('custom \u25bc')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="provider-card">
        <div
          className="provider-card__titlebar"
          onClick={this.toggleDetails}
          onKeyPress={this.toggleDetails}
          role="button"
          tabIndex={0}>
          <div className="provider-card__titlebar-name">
            {this.props.provider.name}
          </div>

          <div className="provider-card__titlebar-icon">
            {this.renderCollapseExpandIcon()}
          </div>
        </div>

        {this.renderDetails()}

        <ProviderModal
          isOpen={this.state.modalIsOpen}
          closeModal={this.closeAccessModal}
          title={this.props.provider.name} />
      </div>
    );
  }
}

ProviderCard.propTypes = {
  provider: PropTypes.object.isRequired,
};
