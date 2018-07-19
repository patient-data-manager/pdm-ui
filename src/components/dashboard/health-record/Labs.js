import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export default class Labs extends Component {
  render() {
    return (
      <div className="health-record__labs">
        <VerticalList
          list={this.labs()}
          listType="labs"
          dateProperty="date"
          descriptionProperty="text" />
      </div>
    );
  }

  labs() {
    let self = this;
    return this.props.labs.map((lab) => {
      return { date: lab.effectiveDateTime, text: self.labDescription(lab) };
    });
  }

  labDescription(lab) {
    let text = lab.code.text;

    if (lab.valueQuantity) {
      text += " " + lab.valueQuantity.value + " " + lab.valueQuantity.unit;
    }

    return text;
  }
}
