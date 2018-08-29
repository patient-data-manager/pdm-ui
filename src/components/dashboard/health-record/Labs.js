import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';
import getProperty from '../../../utils/getProperty';
import LineGraph from '../shared/LineGraph';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Labs extends Component {
  labs = () => {
    return this.props.labs.map((lab) => {
      return { date: lab.effectiveDateTime, text: this.labDescription(lab) };
    });
  }

  labDescription = (lab) => {
    let text = getDisplayString(lab, 'code');
    if (lab.valueQuantity) text = `${text} ${lab.valueQuantity.value} ${lab.valueQuantity.unit}`;
    return text;
  }

  groupLabs() {
    let grouped = {};
    this.props.labs.forEach((lab) => {
      const code = getProperty(lab, "code.coding.firstObject.code");
      const referenceRange = getProperty(lab, "referenceRange");
      const value = getProperty(lab, "valueQuantity");
      if (code && code !== "" && value) {
        let group = grouped[code];
        if (!group) {
          group = { 
            values: [],
            title: getProperty(lab, "code.text") || getProperty(lab, "code.coding.firstObject.display") 
          };
          grouped[code] = group;
        }

        if (referenceRange) {
          group['referenceRanges'] = referenceRange.map((refRange) => {
            return { high: refRange.high, low: refRange.low, assessment: refRange.text };
          });
        }
        if (value.unit && !group.unit) {
          group.title += ` (${value.unit})`;
          group.unit = value.unit;
        }
        group.values.push({ value: value.value, date: lab.effectiveDateTime });
      }
    });
    return grouped;
  }

  renderLabGraphs() {
    const groups = this.groupLabs();
    let graphs = [];
    for (const index in groups) {
      let group = groups[index];
      graphs.push(
        <LineGraph  
          key={index} 
          title={group.title}
          data={group.values}
          referenceRanges={group.referenceRanges}
          unit={group.unit} />
      );
    }
    return graphs.length > 0 ? graphs : '' ;
  }

  render() {
    if (this.props.labs.length === 0) return <div className="labs no-entries">No entries.</div>;

    return (
      <div className="labs">
        {this.renderLabGraphs()}
        <VerticalTimeline items={this.labs()} icon="flask" />
      </div>
    );
  }
}

Labs.propTypes = {
  labs: PropTypes.array
};

Labs.defaultProps = {
  labs: []
};
