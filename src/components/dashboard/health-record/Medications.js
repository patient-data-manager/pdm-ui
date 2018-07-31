import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';
import TableList from '../shared/TableList';

export default class Medications extends Component {
  medications() {
    return this.props.medicationRequests.map((medication) => {
      return {
        date: medication.authoredOn,
        text: getDisplayString(medication, 'medicationCodeableConcept')
      };
    });
  }

  currentMedications() {
    const currentMedications = this.props.medicationRequests.filter((medication) =>
      (medication.status === 'active' || medication.status === 'intended' || medication.status === 'on-hold'));

    let filteredCurrentMedications = [];
    currentMedications.forEach((medication, index) => {
      filteredCurrentMedications[index] = {
        medication: getDisplayString(medication, 'medicationCodeableConcept'),
        status: medication.status,
        'perscribed date': medication.authoredOn
      };
    });

    return filteredCurrentMedications;
  }

  render() {
    if (this.props.medicationRequests.length === 0) return <div className="medications no-entries">No entries.</div>;

    return (
      <div className="medications">
        <TableList
          title="Current medications list"
          headers={['medication', 'status', 'perscribed date']}
          data={this.currentMedications()}
          formatters={{ 'perscribed date': (value) => moment(value).format('MMM D, YYYY') }}
          sort={{ order: 'desc', orderBy: 2 }} />
        <VerticalTimeline items={this.medications()} icon="pills" />
      </div>
    );
  }
}

Medications.propTypes = {
  medicationRequests: PropTypes.array,
  medicationStatements: PropTypes.array,
};

Medications.defaultProps = {
  medicationRequests: [],
  medicationStatements: [],
};
