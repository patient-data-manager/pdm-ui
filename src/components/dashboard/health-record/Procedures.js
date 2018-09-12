import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';
import isValid from '../../../utils/isValid';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Procedures extends Component {
  procedureDate(procedure) {
    let date = procedure.performedDateTime;
    if (!isValid(date) && procedure.performedPeriod) {
      date = procedure.performedPeriod.start;
    }
    return date;
  }

  procedures() {
    return this.props.procedures.map((procedure) => {
      const date = this.procedureDate(procedure);
      return { date, text: getDisplayString(procedure, 'code') };
    });
  }

  render() {
    if (this.props.procedures.length === 0) return <div className="procedures no-entries">No entries.</div>;

    return (
      <div className="procedures">
        <VerticalTimeline items={this.procedures()} icon="hospital" />
      </div>
    );
  }
}

Procedures.propTypes = {
  procedures: PropTypes.array
};

Procedures.defaultProps = {
  procedures: []
};
