import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsExpanded: false
    };
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
        <div className="provider-card__details"></div>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  provider: PropTypes.object.isRequired,
};