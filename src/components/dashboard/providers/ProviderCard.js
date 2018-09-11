import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import isValid from '../../../utils/isValid';

export default class ProviderCard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      detailsExpanded: false,
      healthRecordAccess: 'none'
    };
  }

  toggleDetails = () => {
    this.setState({ detailsExpanded: !this.state.detailsExpanded });
  }

  handleAccessChange = (event) => {
    this.setState({ healthRecordAccess: event.target.value });
    // TO-DO: change access levels in DB not just state
  }

  formatDate = (date) => {
    if (isValid(date)) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

  renderCollapseExpandIcon = () => {
    if (this.state.detailsExpanded) {
      return <FontAwesomeIcon icon="chevron-down" />;
    } else {
      return <FontAwesomeIcon icon="chevron-right" />;
    }
  }

  renderLogo = () => {
    if (!isValid(this.props.imageUrl)) return null;

    return (
      <div className="details-logo">
        <img className="details-logo__img" src={this.props.imageUrl} alt="" />
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
        <div className="details-dates-logo">
          <div className="details-dates">
            <div className="details-dates-added-on">
              <div className="date-key">Added on</div>
              <div className="date-value">{this.formatDate(this.props.provider.addedOn)}</div>
            </div>          
            <div className="details-dates-last-updated">
              <div className="date-key">Last updated</div>
              <div className="date-value">{this.formatDate(this.props.provider.lastUpdated)}</div>
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
              {this.renderRadioButton('custom')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return ( 
      <div className="provider-card">
        <div className="provider-card__titlebar" onClick={this.toggleDetails} onKeyPress={this.toggleDetails} 
          role="button" tabIndex={0}>
          <div className="provider-card__titlebar-name">
            {this.props.provider.name}
          </div>
          <div className="provider-card__titlebar-icon">
            {this.renderCollapseExpandIcon()}
          </div>
        </div>
        {this.renderDetails()}
      </div>
    );
  }
}

ProviderCard.propTypes = {
  provider: PropTypes.object.isRequired,
  imageUrl: PropTypes.string
};