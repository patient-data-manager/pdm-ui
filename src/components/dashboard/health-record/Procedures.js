import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Procedures extends Component {
  procedures() {
    return this.props.procedures.map((p) => ({ date: p.performedDateTime, text: p.code.text }));
  }

  render() {
    return (
      <div className="health-record__procedures">
        <VerticalTimeline
          items={this.procedures()}
          icon="hospital" />
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
