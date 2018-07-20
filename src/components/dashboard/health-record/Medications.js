import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Medications extends Component {
  medications() {
    return this.props.medications.map((medication) => {
      return { date: medication.effectivePeriod.start, text: medication.medicationCodeableConcept.text };
    });
  }

  render() {
    return (
      <div className="medications">
        <VerticalTimeline items={this.medications()} icon="pills" />
      </div>
    );
  }
}

Medications.propTypes = {
  medications: PropTypes.array
};

Medications.defaultProps = {
  medications: []
};
