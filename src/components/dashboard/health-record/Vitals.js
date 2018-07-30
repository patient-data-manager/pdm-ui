import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Vitals extends Component {
  vitals = () => {
    return this.props.vitals.map((vital) => {
      return { date: vital.effectiveDateTime, text: this.vitalDescription(vital) };
    });
  }

  vitalText = (vital) => {
    if (vital.code !== undefined) {
      if (vital.code.text) return vital.code.text;
      if (vital.code.coding[0].display) return vital.code.coding[0].display;
    }
    return '';
  }

  vitalDescription = (vital) => {
    let text = this.vitalText(vital);
    if (vital.valueQuantity) text = `${text} ${vital.valueQuantity.value} ${vital.valueQuantity.unit}`;
    return text;
  }

  render() {
    if (this.props.vitals.length === 0) return <div className="vitals no-entries">No entries.</div>;

    return (
      <div className="vitals">
        <VerticalTimeline items={this.vitals()} icon="heartbeat" />
      </div>
    );
  }
}

Vitals.propTypes = {
  vitals: PropTypes.array
};

Vitals.defaultProps = {
  vitals: []
};
