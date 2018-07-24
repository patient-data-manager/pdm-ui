import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Medications extends Component {
  medications() {
    return this.props.medicationRequests.map((medication) => {
      return { 
        date: medication.authoredOn,
        text: (medication.medicationCodeableConcept !== undefined ?  medication.medicationCodeableConcept.text : '')
      }
    });
  }

  renderMedicationTable(currentMedications) {
    if (currentMedications.length === 0) {
      return <div className="medications__table-label">No current medications</div>
    } else {
      return(
        <div className="medications__table-container">   
          <div className="medications__table-label">Current medications list</div>
          <div className="medications__table">
            <div className="medications__table-header">
              <div className="medications__table-medication"><span> medication</span></div>
              <div className="medications__table-status"><span> status</span></div>
              <div className="medications__table-perscribed-date"><span> perscribed date</span></div>
              <div className="medications__table-perscribed-by"><span> perscribed by</span></div>
              <div className="medications__table-refills"><span> refills</span></div>
            </div>

            {currentMedications.map((medication) => 
              <div key={medication.id} className="medications__table-row">
                <div className="medications__table-medication"> {medication.medicationCodeableConcept !== undefined ?  medication.medicationCodeableConcept.text : ''}</div>
                <div className="medications__table-status"> {medication.status}</div>
                <div className="medications__table-perscribed-date"> {moment(medication.authoredOn).format('MMM D, YYYY')}</div>
                <div className="medications__table-perscribed-by"></div>
                <div className="medications__table-refills"></div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.medicationRequests.length === 0) return <div className="medications no-entries">No entries.</div>;

    console.log(this.props.medicationRequests)

    const currentMedications = this.props.medicationRequests.filter((medication) => ('active' || 'intended' || 'on-hold') === medication.status)
      .sort((a, b) => moment(b.authoredOn) - moment(a.authoredOn)).sort(((a, b) => b.status < a.status));

    return (
      <div className="medications">
        {this.renderMedicationTable(currentMedications)}

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
