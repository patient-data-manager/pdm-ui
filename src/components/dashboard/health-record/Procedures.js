import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Procedures extends Component {
  procedures() {
    return this.props.procedures.map((procedure) => {
      return { date: procedure.performedDateTime, text: this.procedureText(procedure) };
    });
  }

  procedureText = (procedure) => {
    if (procedure.code !== undefined) {
      if (procedure.code.text) return procedure.code.text;
      if (procedure.code.coding[0].display) return procedure.code.coding[0].display;
    }
    return '';
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
