import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import getLabs from '../../../utils/healthRecordResources';
import getDisplayString from '../../../utils/getDisplayString';
import getProperty from '../../../utils/getProperty';

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

  getRangeItems = () => {
    return [
      { rangeText: '1mo', rangeNum: 1, rangeType: 'months', rangeFutureType: 'days' },
      { rangeText: '3mo', rangeNum: 3, rangeType: 'months', rangeFutureType: 'days' },
      { rangeText: '6mo', rangeNum: 6, rangeType: 'months', rangeFutureType: 'months' },
      { rangeText: '1yr', rangeNum: 1, rangeType: 'year', rangeFutureType: 'months' },
      { rangeText: '5yr', rangeNum: 5, rangeType: 'year', rangeFutureType: 'months' },
      { rangeText: 'all' }
    ];
  }

  getHoverElement = (date, text) => {
    return (
      `<div class="hover-element" data-html=true>
        <div class="hover-element__date">Date: ${moment(date).format('YYYY-MM-DD')}</div>
        <div class="hover-element__text">${text}</div>
      </div>`
    );
  }

  getResourceItems = (resources, resourceType, group, displayField, dateField) => {
    if (!resources) return [];

    let items = [];
    resources.forEach((resource) => {
      const title = getDisplayString(resource, displayField);
      const date = getProperty(resource, dateField);
      const startDate = moment(date).valueOf();

      items.push({
        id: _.uniqueId(resourceType),
        group,
        title,
        start_time: startDate,
        end_time: moment(date).add(1, 'day').valueOf(),
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

    const procedureItems = this.getResourceItems(
      healthRecord.Procedure, 'procedure', 1, 'code', 'performedPeriod.start'
    );
    const conditionItems = this.getResourceItems(healthRecord.Condition, 'condition', 2, 'code', 'onsetDateTime');
    const labItems = this.getResourceItems(getLabs(healthRecord.Observation), 'lab', 3, 'code', 'effectiveDateTime');
    const medicationItems = this.getResourceItems(
      healthRecord.MedicationRequest, 'medication', 4, 'medicationCodeableConcept', 'authoredOn'
    );

    return procedureItems.concat(conditionItems).concat(labItems).concat(medicationItems);
  }

  renderSummaryRow = (key, value) => {
    return (
      <div className="summary__table-row">
        <div className="summary__table-key">{key}</div>
        <div className="summary__table-value">{value}</div>
      </div>
    );
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
            {this.renderSummaryRow('Name', patientName)}
            {this.renderSummaryRow('Gender', profile.gender)}
            {this.renderSummaryRow('DOB', patientDOB)}
            {this.renderSummaryRow('Address', patientAddress)}
            {this.renderSummaryRow('Phone', profile.telephone)}
            {this.renderSummaryRow('PCP', 'Dr. Parul Desai')} {/* TODO: hook up */}
          </div>
        </div>

        <div className="summary__timeline">
          <HorizontalTimeline
            title="Timeline"
            groups={this.getSummaryGroups()}
            items={this.getSummaryItems()}
            legendItems={this.getLegendItems()}
            rangeItems={this.getRangeItems()}
            defaultRange={'1yr'} />
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
