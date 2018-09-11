import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isValid from '../../../utils/isValid';
import getBloodPressureString from '../../../utils/getBloodPressureString';
import getDisplayString from '../../../utils/getDisplayString';
import _ from 'lodash';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Vitals extends Component {
  vitals = () => {
    let vitals = [];

    this.props.vitals.forEach((vital) => {
      if (getDisplayString(vital, 'code') === 'Blood Pressure') {
        vitals.push({ date: vital.effectiveDateTime, text: getBloodPressureString(vital, 'Systolic Blood Pressure') });
        vitals.push({ date: vital.effectiveDateTime, text: getBloodPressureString(vital, 'Diastolic Blood Pressure') });
      } else {
        vitals.push({ date: vital.effectiveDateTime, text: this.vitalDescription(vital) });
      }
    });

    return vitals;
  }

  vitalDescription = (vital) => {
    let text = getDisplayString(vital, 'code');
    if (isValid(vital.valueQuantity)) {
      text = `${text} ${_.round(vital.valueQuantity.value, 2)} ${vital.valueQuantity.unit}`;
    }
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
