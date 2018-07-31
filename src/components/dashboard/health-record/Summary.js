import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import HorizontalTimeline from '../shared/HorizontalTimeline';

import getLabs from '../../../utils/healthRecordResources';

export default class Summary extends Component {
  getSummaryGroups = () => {
    return [
      { 'id': 1, 'title': 'procedure' },
      { 'id': 2, 'title': 'condition' },
      { 'id': 3, 'title': 'lab' },
      { 'id': 4, 'title': 'medication' }
    ];
  }

  getSummaryItems = () => {
    const { healthRecord } = this.props;
    const procedures = healthRecord.Procedure;
    const conditions = healthRecord.Condition;
    const labs = getLabs(healthRecord.Observation);
    const medications = healthRecord.MedicationRequest;
    let items = [];

    // procedures
    procedures.forEach((procedure, index) => {
      console.debug('procedure', procedure);

      items.push({
        id: 1,

      });
    });


    return [
      {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
      },
      {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().add(-0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
      },
      {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
      }
    ];
  }

  render() {
    const { patient, profile } = this.props;
    let patientName, patientAge, patientDOB, patientAddress;

    if (Object.keys(patient).length > 0) {
      patientName = `${patient.name[0].given[0]} ${patient.name[0].family}`;
      patientAge = moment().diff(profile.dob, 'years');
      patientDOB = `${moment(profile.dob).format('MMM D, YYYY')} (age ${patientAge})`;
      patientAddress = `${profile.street}, ${profile.city}, ${profile.state} ${profile.zip}`;
    }

    return (
      <div className="summary">
        <div className="summary__image-table">
          <div className="summary__image">
            <img src="/assets/images/patient-image.png" alt="patient" />
          </div>

          <div className="summary__divider" />

          <div className="summary__table">
            <div className="summary__table-row">
              <div className="summary__table-key">Name</div>
              <div className="summary__table-value">{patientName}</div>
            </div>

            <div className="summary__table-row">
              <div className="summary__table-key">Gender</div>
              <div className="summary__table-value">{profile.gender}</div>
            </div>

            <div className="summary__table-row">
              <div className="summary__table-key">DOB</div>
              <div className="summary__table-value">{patientDOB}</div>
            </div>

            <div className="summary__table-row">
              <div className="summary__table-key">Address</div>
              <div className="summary__table-value">{patientAddress}</div>
            </div>

            <div className="summary__table-row">
              <div className="summary__table-key">Phone</div>
              <div className="summary__table-value">{profile.telephone}</div>
            </div>

            <div className="summary__table-row">
              <div className="summary__table-key">PCP</div>
              <div className="summary__table-value summary__table-pcp">Dr. Parul Desai</div> {/* TODO: hook up */}
            </div>
          </div>
        </div>

        <div className="summary__timeline">
          <HorizontalTimeline
            title="Timeline"
            groups={this.getSummaryGroups()}
            items={this.getSummaryItems()} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profiles.activeProfile
  };
}

Summary.propTypes = {
  patient: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  healthRecord: PropTypes.object.isRequired
};
