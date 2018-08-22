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

    // test data - TODO: hook up to actual lab data
    let data = [
      { 'value': 200, 'date': '1977-12-16T14:40:51-05:00' },
      { 'value': 100, 'date': '2017-12-16T14:40:51-05:00' },
      { 'value': 300, 'date': '2009-12-16T14:40:51-05:00' },
      { 'value': 500, 'date': '2001-12-16T14:40:51-05:00' }
    ];

    // test data - TODO: hook up to actual lab data
    let referenceRanges = [
      { low: 450, high: 'max', assessment: 'high' },
      { low: 100, high: 450, assessment: 'average' },
      { low: 0, high: 100, assessment: 'low' }
    ];

    return (
      <div className="labs">
        <LineGraph title={"Hemoglobin (%)"} data={data} referenceRanges={referenceRanges} unit={'10^9/L'} />
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
      graphs.push(<LineGraph title={group.title}
        data={group.values}
        referenceRanges={group.referenceRanges}
        unit={''} />);
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
          if (rr) {
            group['referenceRanges'] = rr.map(function(r) { return { high: r.high, low: r.low, assessment: r.text }; });
          }
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
