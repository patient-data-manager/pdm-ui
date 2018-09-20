import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserStarIcon from '../../../icons/UserStarIcon';
import moment from 'moment';
import _ from 'lodash';

import getDisplayString from '../../../utils/getDisplayString';
import getLabs from '../../../utils/healthRecordResources';
import getProperty from '../../../utils/getProperty';
import isValid from '../../../utils/isValid';

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

  getResourceItems = (resources, resourceType, group, displayField, dateField) => {
    if (!isValid(resources)) return [];

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
        className: 'timeline-item theme-dark',
        icon: this.getTimelineIcon(resourceType),
        hoverElement: this.renderHoverElement(startDate, resourceType, title)
      });
    });

    return items;
  }

  getSummaryItems = () => {
    const { healthRecord } = this.props;
    if (!isValid(healthRecord)) return [];

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

  renderHoverElement = (date, group, text) => {
    const dateIcon = ReactDOMServer.renderToString(<FontAwesomeIcon icon="calendar" fixedWidth />);
    const typeIcon = ReactDOMServer.renderToString(<FontAwesomeIcon icon="notes-medical" fixedWidth />);

    return (
      `<div class="hover-element" data-html=true>
        <div class="hover-element__date">
          <span class="hover-element__label">${dateIcon}</span>${moment(date).format('MMM Do YYYY, h:mm a')}
        </div>

        <div class="hover-element__group"><span class="hover-element__label">${typeIcon}</span>${group}</div>
        <div class="hover-element__text">${text}</div>
      </div>`
    );
  }

  renderProfileImage = () => {
    const { profile } = this.props;

    if (profile.photo) {
      return <img src={profile.photo} alt="Profile" className="summary__profile-photo" />;
    } else if (profile.relationship === 'self') {
      return <UserStarIcon height={135} />;
    }
    return <FontAwesomeIcon icon="user-circle" />;
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
    let patientName, patientAge, patientDOB, patientStreet, patientCity, patientState, patientZip, patientAddress;

    if (Object.keys(patient).length > 0) {
      patientName = `${patient.name[0].given[0]} ${patient.name[0].family}`;
      patientAge = moment().diff(profile.dob, 'years');
      patientDOB = profile.dob ? `${moment(profile.dob).format('MMM D, YYYY')} (age ${patientAge})` : '';
      patientStreet = profile.street ? `${profile.street}, ` : '';
      patientCity = profile.city ? `${profile.city}, ` : '';
      patientState = profile.state ? `${profile.state} ` : '';
      patientZip = profile.zip ? `${profile.zip}` : '';
      patientAddress = patientStreet + patientCity + patientState + patientZip;
    }

    return (
      <div className="summary">
        <div className="summary__image-table">
          <div className="summary__image">
            {this.renderProfileImage()}
          </div>

          <div className="summary__divider" />

          <div className="summary__table">
            {this.renderSummaryRow('Name', patientName)}
            {this.renderSummaryRow('Gender', profile.gender)}
            {this.renderSummaryRow('DOB', patientDOB)}
            {this.renderSummaryRow('Address', patientAddress)}
            {this.renderSummaryRow('Phone', profile.telephone)}
            {this.renderSummaryRow('PCP', '')} {/* TODO: hook up */}
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
