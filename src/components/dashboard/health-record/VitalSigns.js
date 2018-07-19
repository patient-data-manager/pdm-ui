import React, { Component } from 'react';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class VitalSigns extends Component {
  vitals() {
    let self = this;
    return this.props.labs.map((lab) => {
      return { date: lab.effectiveDateTime, text: self.vitalsDescription(lab) };
    });
  }

  vitalsDescription(vitalSign) {
    let text = vitalSign.code.text;

    if (vitalSign.valueQuantity) {
      text += " " + vitalSign.valueQuantity.value + " " +vitalSign.valueQuantity.unit;
    }

    return text;
  }

  render() {
    return (
      <div className="health-record__labs">
        <VerticalTimeline
          items={this.vitals()}
          listType="labs" />
      </div>
    );
  }
}
