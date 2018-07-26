import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';
import TableList from '../shared/TableList';

export default class Conditions extends Component {
  getConditions() {
    return this.props.conditions.map((condition) => {
      return { date: condition.onsetDateTime, text: condition.code.text };
    });
  }

  getCurrentConditions() {
    const currentConditions = this.props.conditions.filter((condition) => condition.clinicalStatus === 'active');

    let filteredCurrentConditions = [];
    currentConditions.forEach((condition, index) => {
      filteredCurrentConditions[index] = {
        condition: condition.code.text,
        'diagnosed date': condition.onsetDateTime
      };
    });

    return filteredCurrentConditions;
  }

  render() {
    if (this.props.conditions.length === 0) return <div className="conditions no-entries">No entries.</div>;

    return (
      <div className="conditions">
        <TableList
          title="Current conditions list"
          headers={['condition', 'diagnosed date']}
          data={this.getCurrentConditions()}
          formatters={{ 'diagnosed date': (value) => moment(value).format('MMM D, YYYY') }}
          sort={{ order: 'desc', orderBy: 1 }} />
        <VerticalTimeline items={this.getConditions()} icon="heartbeat" />
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
