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
    if (this.props.conditions.length === 0) return <div className="conditions no-entries">No entries.</div>;

    return (
      <div className="conditions">
        <VerticalTimeline items={this.conditions()} icon="heartbeat" />
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
