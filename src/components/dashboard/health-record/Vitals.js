import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';
import BloodPressureGraph from '../shared/BloodPressureGraph';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Vitals extends Component {
  vitals = () => {
    return this.props.vitals.map((vital) => {
      return { date: vital.effectiveDateTime, text: this.vitalDescription(vital) };
    });
  }

  vitalDescription = (vital) => {
    let text = getDisplayString(vital, 'code');
    if (vital.valueQuantity) text = `${text} ${vital.valueQuantity.value} ${vital.valueQuantity.unit}`;
    return text;
  }

  findBps(){
    let bps = [];
    for(var i in this.props.vitals){
      let vital = this.props.vitals[i];
      if(vital.code.coding[0].code == '55284-4'){
        bps.push(vital);
      }
    }
    return bps;
  }
  render() {
    if (this.props.vitals.length === 0) return <div className="vitals no-entries">No entries.</div>;

    return (
      <div className="vitals">
        <BloodPressureGraph
        title="Blood Pressure"
        data={this.findBps()}
        referenceRanges={[]}
        unit={[]} />
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
