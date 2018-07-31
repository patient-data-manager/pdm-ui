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

    let data = [
      {
        'xVar': 200,
        'yVar': 100
      },
      {
        'xVar': 300,
        'yVar': 50
      },
      {
        'xVar': 600,
        'yVar': 600
      },
    ];

    let referenceRanges = [
      {
        low: 450,
        high: 'max',
        assessment: 'high'
      },
      {
        low: 100,
        high: 450,
        assessment: 'average'
      },
      {
        low: 0,
        high: 100,
        assessment: 'low'
      }
    ];

    return (
      <div className="labs">
        <LineGraph data={data} referenceRanges={referenceRanges}/>
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
