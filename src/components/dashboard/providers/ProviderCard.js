import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProfileCard extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderCollapseExpandIcon = () => {
    return (
      <FontAwesomeIcon icon="chevron-right" />
    );
  }

  render() {
    return ( 
      <div className="provider-card">
        <div className="provider-card__titlebar">
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