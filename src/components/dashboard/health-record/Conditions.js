import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Conditions extends Component {
  conditions() {
    return this.props.conditions.map((condition) => {
      return { date: condition.onsetDateTime, text: condition.code.text };
    });
  }

  render() {
    if (this.props.conditions.length === 0) return <div className="conditions no-entries">No entries.</div>;

    const currentConditions = this.props.conditions.filter((condition) => 'active' === condition.clinicalStatus);
	 added and populated conditions table
    return (
      <div className="conditions">
        <div className="conditions__table-label">Current conditions list</div>
        <div className="conditions__table">
          <div className="conditions__table-row conditions__table-header">
            <div className="conditions__table-condition"><span> condition</span></div>
            <div className="conditions__table-diagnosed-date"><span> diagnosed date</span></div>
            <div className="conditions__table-diagnosed-by"><span> diagnosed by</span></div>
          </div>
          {currentConditions.map((condition) => 
            <div key={condition.id} className="conditions__table-row">
              <div className="conditions__table-condition"> {condition.code.text}</div>
              <div className="conditions__table-diagnosed-date"> {moment(condition.onsetDateTime).format('MMM D, YYYY')}</div>
              <div className="conditions__table-diagnosed-by"></div>
            </div>
          )}
        </div>

        <VerticalTimeline items={this.conditions()} icon="heartbeat" />
      </div>
    );
  }
}

Conditions.propTypes = {
  conditions: PropTypes.array
};

Conditions.defaultProps = {
  conditions: []
};
