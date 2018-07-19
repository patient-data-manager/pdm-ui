import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Conditions extends Component {
  conditions() {
    return this.props.conditions.map((condition) => {
      return { date: condition.onsetDateTime, text: condition.code.text };
    });
  }

  render() {
    return (
      <div className="health-record__conditions">
        <VerticalTimeline
          items={this.conditions()}
          icon="heartbeat" />
      </div>
    );
  }
}

Conditions.propTypes = {
  conditions: PropTypes.array
};

Conditions.defaultProps = {
  conditions: []
};
