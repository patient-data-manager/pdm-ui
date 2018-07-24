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

  renderTable(conditions) {
    if (conditions.length === 0) {
      return <div className="conditions__table-label">No current conditions.</div>;
    } else {
      return(
        <div className="conditions__table-container">
          <div className="conditions__table-label">Current conditions list</div>
          <div className="conditions__table">
            <div className="conditions__table-header">
              <div className="conditions__table-condition"><span> condition</span></div>
              <div className="conditions__table-diagnosed-date"><span> diagnosed date</span></div>
              <div className="conditions__table-diagnosed-by"><span> diagnosed by</span></div>
            </div>
            {conditions.map((condition) => 
              <div key={condition.id} className="conditions__table-row">
                <div className="conditions__table-condition"> {condition.code.text}</div>
                <div className="conditions__table-diagnosed-date"> 
                  {moment(condition.onsetDateTime).format('MMM D, YYYY')}
                </div>
                <div className="conditions__table-diagnosed-by"></div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.conditions.length === 0) return <div className="conditions no-entries">No entries.</div>;

    const currentConditions = this.props.conditions.filter((condition) => 'active' === condition.clinicalStatus)
      .sort(((a, b) => moment(b.onsetDateTime) - moment(a.onsetDateTime)));

    return (
      <div className="conditions">
        {this.renderTable(currentConditions)}
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
