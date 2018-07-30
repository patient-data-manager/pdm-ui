import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';
import TableList from '../shared/TableList';

export default class Conditions extends Component {
  conditions() {
    return this.props.conditions.map((condition) => {
      return { date: condition.onsetDateTime, text: this.conditionText(condition) };
    });
  }

  currentConditions() {
    const currentConditions = this.props.conditions.filter((condition) => condition.clinicalStatus === 'active');

    let filteredCurrentConditions = [];
    currentConditions.forEach((condition, index) => {
      filteredCurrentConditions[index] = {
        condition: this.conditionText(condition),
        'diagnosed date': condition.onsetDateTime
      };
    });

    return filteredCurrentConditions;
  }

  conditionText = (condition) => {
    if (condition.code !== undefined) {
      if (condition.code.text) return condition.code.text;
      if (condition.code.coding[0].display) return condition.code.coding[0].display;
    }
    return '';
  }

  render() {
    if (this.props.conditions.length === 0) return <div className="conditions no-entries">No entries.</div>;

    return (
      <div className="conditions">
        <TableList
          title="Current conditions list"
          headers={['condition', 'diagnosed date']}
          data={this.currentConditions()}
          formatters={{ 'diagnosed date': (value) => moment(value).format('MMM D, YYYY') }}
          sort={{ order: 'desc', orderBy: 1 }} />
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
