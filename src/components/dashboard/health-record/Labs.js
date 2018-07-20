import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Labs extends Component {
  labs = () => {
    return this.props.labs.map((lab) => {
      return { date: lab.effectiveDateTime, text: this.labDescription(lab) };
    });
  }

  labDescription = (lab) => {
    let text = lab.code.text;
    if (lab.valueQuantity) text = `${text} ${lab.valueQuantity.value} ${lab.valueQuantity.unit}`;
    return text;
  }

  render() {
    return (
      <div className="labs">
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
