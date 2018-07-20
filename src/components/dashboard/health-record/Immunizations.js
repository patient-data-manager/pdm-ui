import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Immunizations extends Component {
  immunizations() {
    return this.props.immunizations.map((immunization) => {
      return { date: immunization.date, text: immunization.vaccineCode.text };
    });
  }

  render() {
    return (
      <div className="immunizations">
        <VerticalTimeline items={this.immunizations()} icon="syringe" />
      </div>
    );
  }
}

Immunizations.propTypes = {
  immunizations: PropTypes.array
};

Immunizations.defaultProps = {
  immunizations: []
};
