import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CustomGraphTooltip extends Component {
  render() {
    const { active, payload } = this.props;
    const details = payload.length > 0 ? payload[0].payload : null;
    if (active && details) {
      const displayDate = moment(details.date).format('MMM D, YYYY');
      return (
        <div className="line-graph__tooltip">
          <div className="line-graph__tooltip-field"> 
            <b>Date: </b> {displayDate}
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

CustomGraphTooltip.propTypes = {
  title: PropTypes.string,
  payload: PropTypes.array
};
