import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = { detailsExpanded: false };
  }

  toggleDetails = () => {
    this.setState({ detailsExpanded: !this.state.detailsExpanded });
  }

  renderCollapseExpandIcon = () => {
    if (this.state.detailsExpanded) {
      return <FontAwesomeIcon icon="chevron-down" onClick={this.toggleDetails} />;
    } else {
      return <FontAwesomeIcon icon="chevron-right" onClick={this.toggleDetails} />;
    }
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
            insert logo here
          </div>
        </div>
        <div className="details-permissions">
          insert permissions here
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

ProfileCard.propTypes = {
  provider: PropTypes.object.isRequired,
};