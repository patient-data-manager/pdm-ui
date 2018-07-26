import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';
import TableList from '../shared/TableList';

export default class Medications extends Component {

  getMedications() {
    return this.props.medicationRequests.map((medication) => {
      return { 
        date: medication.authoredOn,
        text: (medication.medicationCodeableConcept !== undefined ?  medication.medicationCodeableConcept.text : '')
      };
    });
  }

  getCurrentMedications() {
    const currentMedications = this.props.medicationRequests
      .filter((medication) => (medication.status === 'active' || medication.status === 'intended' || medication.status === 'on-hold'));

    let filteredCurrentMedications = [];
    currentMedications.forEach((medication, index) => {
      filteredCurrentMedications[index] = {
        medication: (medication.medicationCodeableConcept !== undefined ?  medication.medicationCodeableConcept.text : ''),
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
          data={this.getCurrentMedications()}
          formatters={{ 'perscribed date': (value) => moment(value).format('MMM D, YYYY') }}
          sort={{ order: 'desc' , orderBy: 2 }} />
        <VerticalTimeline items={this.getMedications()} icon="heartbeat" />
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
