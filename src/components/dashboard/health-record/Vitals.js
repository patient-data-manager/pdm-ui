import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import isValid from '../../../utils/isValid';
import isValidAndNotEmpty from '../../../utils/isValidAndNotEmpty';
import getProperty from '../../../utils/getProperty';
import getBloodPressureString from '../../../utils/getBloodPressureString';
import getDisplayString from '../../../utils/getDisplayString';

import VerticalTimeline from '../shared/VerticalTimeline';
import LineGraph from '../shared/LineGraph';

export default class Vitals extends Component {
  vitals = () => {
    let vitals = [];

    this.props.vitals.forEach((vital) => {
      if (getDisplayString(vital, 'code') === 'Blood Pressure') {
        vitals.push({ 
          date: vital.effectiveDateTime, 
          text: getBloodPressureString(vital, 'Systolic Blood Pressure'), 
          icon: 'heartbeat' 
        });
        vitals.push({ 
          date: vital.effectiveDateTime, 
          text: getBloodPressureString(vital, 'Diastolic Blood Pressure'), 
          icon: 'heartbeat' 
        });
      } else {
        vitals.push({ date: vital.effectiveDateTime, text: this.vitalDescription(vital), icon: 'heartbeat' });
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

  groupVitals() {
    let grouped = {};
    this.props.vitals.forEach((vital) => {
      const code = getProperty(vital, 'code.coding.firstObject.code');
      const referenceRange = getProperty(vital, 'referenceRange');
      const value = getProperty(vital, 'valueQuantity');

      if (isValidAndNotEmpty(code) && isValid(value)) {
        let group = grouped[code];
        if (!isValid(group)) {
          group = {
            values: [],
            title: getProperty(vital, 'code.text') || getProperty(vital, 'code.coding.firstObject.display')
          };

          grouped[code] = group;
        }

        if (referenceRange) {
          group['referenceRanges'] = referenceRange.map((refRange) => {
            return { high: refRange.high, low: refRange.low, assessment: refRange.text };
          });
        }

        if (isValid(value.unit) && !isValid(group.unit)) {
          group.title += ` (${value.unit})`;
          group.unit = value.unit;
        }

        group.values.push({ value: value.value, date: vital.effectiveDateTime });
      }
    });

    return grouped;
  }

  renderVitalsGraphs = () => {
    const groups = this.groupVitals();
    let graphs = [];
    for (const index in groups) {
      let group = groups[index];
      graphs.push(
        <LineGraph
          key={index}
          title={group.title}
          data={group.values}
          referenceRanges={group.referenceRanges}
          unit={group.unit}
          chartWidth={this.props.chartWidth} />
      );
    }

    return graphs.length > 0 ? graphs : null;
  }

  render() {
    if (this.props.vitals.length === 0) return <div className="vitals no-entries">No entries.</div>;

    return (
      <div className="vitals">
        {this.renderVitalsGraphs()}
        <VerticalTimeline items={this.vitals()} />
      </div>
    );
  }
}

Vitals.propTypes = {
  vitals: PropTypes.array,
  chartWidth: PropTypes.number
};

Vitals.defaultProps = {
  vitals: []
};
