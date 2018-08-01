import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import getLabs from '../../../utils/healthRecordResources';
import getDisplayString from '../../../utils/getDisplayString';

import HorizontalTimeline from '../shared/HorizontalTimeline';

export default class Summary extends Component {
  getSummaryGroups = () => {
    return [
      { 'id': 1, 'title': 'procedure' },
      { 'id': 2, 'title': 'condition' },
      { 'id': 3, 'title': 'lab' },
      { 'id': 4, 'title': 'medication' }
    ];
  }

  getTimelineIcon = (resourceType) => {
    if (resourceType === 'procedure') return 'hospital';
    if (resourceType === 'condition') return 'heartbeat';
    if (resourceType === 'lab') return 'flask';
    if (resourceType === 'medication') return 'pills';
    return '';
  }

  getLegendItems = () => {
    return [
      { icon: 'hospital', text: 'procedure' },
      { icon: 'heartbeat', text: 'condition' },
      { icon: 'flask', text: 'lab' },
      { icon: 'pills', text: 'medication' }
    ];
  }

  getHoverElement = (date, text) => {
    return (
      `<div className="hover-element" data-html={true}>
        <div className="hover-element__date">Date: ${moment(date).format('YYYY-MM-DD')}</div>
        <div className="hover-element__text">${text}</div>
      </div>`
    );
  }

  getResourceItems = (resources, resourceType, group, displayField, dateField) => {
    if (!resources) return [];

    let items = [];
    resources.forEach((resource) => {
      const title = getDisplayString(resource, displayField);
      const startDate = moment(resource[dateField]).valueOf();

      items.push({
        id: _.uniqueId(resourceType),
        group,
        title,
        start_time: startDate,
        end_time: moment(resource[dateField]).add(1, 'day').valueOf(),
        className: 'timeline-item',
        icon: this.getTimelineIcon(resourceType),
        itemProps: { 'data-tip': this.getHoverElement(startDate, title) }
      });
    });

    return items;
  }

  getSummaryItems = () => {
    const { healthRecord } = this.props;
    if (!healthRecord) return [];

    const procedureItems = this.getResourceItems(healthRecord.Procedure, 'procedure', 1, 'code', 'performedDateTime');
    const conditionItems = this.getResourceItems(healthRecord.Condition, 'condition', 2, 'code', 'onsetDateTime');
    const labItems = this.getResourceItems(getLabs(healthRecord.Observation), 'lab', 3, 'code', 'effectiveDateTime');
    const medicationItems = this.getResourceItems(
      healthRecord.MedicationRequest, 'medication', 4, 'medicationCodeableConcept'
    );

    return procedureItems.concat(conditionItems).concat(labItems).concat(medicationItems);
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
            items={this.getSummaryItems()}
            legendItems={this.getLegendItems()} />
        </div>
      </div>
    );
  }
}

Summary.propTypes = {
  patient: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  healthRecord: PropTypes.object
};
