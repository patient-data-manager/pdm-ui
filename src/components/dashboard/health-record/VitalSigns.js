import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export default class VitalSigns extends Component {
  render() {
    return (
      <div className="health-record__labs">
        <VerticalList
          list={this.vitals()}
          listType="labs"
          dateProperty="date"
          descriptionProperty="text"/>
      </div>
    );
  }

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
}
