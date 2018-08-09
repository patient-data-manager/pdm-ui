import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';

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
