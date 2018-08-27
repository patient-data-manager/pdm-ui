import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export default class ProviderCollapsableCard extends Component {
  constructor(props) {
    super(props);

    const state = { 
      detailsExpanded: true, // CHANGE THIS BACK BEFORE PR
      healthRecordAccess: 'none'
    };
    this.state = state;
  }

  toggleDetails = () => {
    this.setState({ detailsExpanded: !this.state.detailsExpanded });
  }

  handleAccessChange = (event) => {
    this.setState({ healthRecordAccess: event.target.value });
  };

  renderCollapseExpandIcon = () => {
    if (this.state.detailsExpanded) {
      return <FontAwesomeIcon icon="chevron-down" onClick={this.toggleDetails} />;
    } else {
      return <FontAwesomeIcon icon="chevron-right" onClick={this.toggleDetails} />;
    }
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
              {/* to-do: get date */}
              <div className="date-value">insert date here</div>
              {/* to-do: insert logic for this */}
              <div className="date-verified">
                <FontAwesomeIcon icon="check" /> verified
              </div>
            </div>          
            <div className="details-dates-last-updated">
              <div className="date-key">Last updated</div>
              {/* to-do: get date */}
              <div className="date-value">insert date here</div>
            </div>
          </div>
          <div className="details-logo">
            {/* to-do: insert logo logic */}
            insert logo here
          </div>
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
        <div className="provider-card__titlebar" role="button">
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

ProviderCollapsableCard.propTypes = {
  provider: PropTypes.object.isRequired,
};