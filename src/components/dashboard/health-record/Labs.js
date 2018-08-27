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

  render() {
    if (this.props.labs.length === 0) return <div className="labs no-entries">No entries.</div>;

    return (
      <div className="labs">
        {this.renderLabGraphs()}
        <VerticalTimeline items={this.labs()} icon="flask" />
      </div>
    );
  }

  renderLabGraphs() {
    let groups = this.groupLabs();
    let graphs = [];
    for (var x in groups) {
      let group = groups[x];
      graphs.push(<LineGraph  key={x} title={group.title}
        data={group.values}
        referenceRanges={group.referenceRanges}
        unit={group.unit} />);
    }
    return graphs.length > 0 ? graphs : '' ;
  }

  groupLabs() {
    let grouped = {};
    this.props.labs.forEach(function(lab) {
      let code = getProperty(lab, "code.coding.firstObject.code");
      let rr = getProperty(lab, "referenceRange");
      let value = getProperty(lab, "valueQuantity");
      if (code && code !== "" && value) {
        let group = grouped[code];
        if (!group) {
          group = { values: [],
            title: getProperty(lab, "code.text") ||
                           getProperty(lab, "code.coding.firstObject.display") };

          grouped[code] = group;
        }

        if (rr) {
          group['referenceRanges'] = rr.map(function(r) { return { high: r.high, low: r.low, assessment: r.text }; });
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
}

Labs.propTypes = {
  labs: PropTypes.array
};

Labs.defaultProps = {
  labs: []
};
