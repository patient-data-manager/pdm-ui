import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalList from '../shared/VerticalList';

export default class Medications extends Component {
  render() {
    return (
      <div className="health-record__medications">
        <VerticalList
          list={this.medications()}
          listType="medications"
          dateProperty="date"
          descriptionProperty="text" />
      </div>
    );
  }

  medications() {
    return this.props.medications.map((medication) => {
      return { date: medication.effectivePeriod.start, text: medication.medicationCodeableConcept.text };
    });
  }
}

Medications.propTypes = {
  medications: PropTypes.array
};

Medications.defaultProps = {
  medications: []
};
