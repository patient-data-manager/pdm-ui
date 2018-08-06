import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomTooltip extends Component {
  render() {
    const { active, payload } = this.props;
    const details = payload.length > 0 ? payload[0].payload : null;
    if (active && details) {
      return (
        <div className="line-graph__tooltip">
          <div className="line-graph__tooltip-field"> 
            <b>Date: </b> {details.date}
          </div>
          <div className="line-graph__tooltip-field"> 
            <b>{this.props.title}: </b> {details.value} {this.props.unit}
          </div>
        </div>
      );
    }
    return null;
  }
}

CustomTooltip.propTypes = {
  title: PropTypes.string,
  payload: PropTypes.array,
};
