import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';

import getDisplayString from '../../../utils/getDisplayString';
import getProperty from '../../../utils/getProperty';
import isValid from '../../../utils/isValid';
import HorizontalTimeline from '../shared/HorizontalTimeline';
import TableList from '../shared/TableList';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Medications extends Component {
  medicationRequests() {
    return this.props.medicationRequests.map((medication) => {
      return {
        date: medication.authoredOn,
        text: getDisplayString(medication, 'medicationCodeableConcept')
      };
    });
  }

  medicationStatements() {
    return this.props.medicationStatements.map((medication) => {
      return {
        date: medication.authoredOn,
        text: getDisplayString(medication, 'medicationCodeableConcept')
      };
    });
  }

  medications() {
    return this.medicationRequests().concat(this.medicationStatements());
  }

  currentMedications() {
    const currentMedications = this.props.medicationStatements.concat(this.props.medicationRequests).filter((med) =>
      (med.status === 'active' || med.status === 'intended' || med.status === 'on-hold')
    );

    let filteredCurrentMedications = [];
    currentMedications.forEach((medication, index) => {
      filteredCurrentMedications[index] = {
        medication: getDisplayString(medication, 'medicationCodeableConcept'),
        status: medication.status,
        'prescribed date': medication.authoredOn
      };
    });

    return filteredCurrentMedications;
  }

  getMedicationItems = () => {
    const { medicationRequests, medicationStatements } = this.props;
    const medications = medicationRequests.concat(medicationStatements);
    if (!isValid(medications)) return [];

    let items = [];
    medications.forEach((medication) => {
      const title = getDisplayString(medication, 'medicationCodeableConcept');
      const date = getProperty(medication, 'authoredOn') ||
                   getProperty(medication, 'effectiveDateTime') || 
                   getProperty(medication, 'effectivePeriod.start');
      const startDate = moment(date).valueOf();
      const isActive = medication.status === 'active';
      const endDate = isActive ? moment().valueOf() : moment(date).add(1, 'day').valueOf();
      const itemClass = classNames('timeline-item theme-light', { 'full-width': isActive });

      items.push({
        id: _.uniqueId('medication'),
        group: 1,
        title,
        start_time: startDate,
        end_time: endDate,
        className: itemClass,
        icon: 'pills',
        hoverElement: this.getHoverElement(startDate, endDate, isActive, title)
      });
    });

    return items;
  }

  getHoverElement = (startDate, endDate, isActive, text) => {
    const dateIcon = ReactDOMServer.renderToString(<FontAwesomeIcon icon="calendar" fixedWidth />);
    const typeIcon = ReactDOMServer.renderToString(<FontAwesomeIcon icon="notes-medical" fixedWidth />);

    return (
      `<div class="hover-element" data-html=true>
        <div class="hover-element__date">
          <span class="hover-element__label">${dateIcon}</span>
          ${moment(startDate).format('MMM Do YYYY, h:mm a')}
          ${isActive ? '' : ` <strong>to</strong> ${moment(endDate).format('MMM Do YYYY, h:mm a')}`}
        </div>

        <div class="hover-element__group">
          <span class="hover-element__label">${typeIcon}</span>
          ${isActive ? 'active' : 'stopped'} medication
        </div>

        <div class="hover-element__text">${text}</div>
      </div>`
    );
  }

  render() {
    if (this.props.medicationRequests.length === 0 && this.props.medicationStatements.length === 0) {
      return <div className="medications no-entries">No entries.</div>;
    }

    return (
      <div className="medications">
        <TableList
          title="Current medications list"
          headers={['medication', 'status', 'prescribed date']}
          data={this.currentMedications()}
          formatters={{ 'perscribed date': (value) => moment(value).format('MMM D, YYYY') }}
          sort={{ order: 'desc', orderBy: 2 }} />

        <div className="medications__timeline">
          <HorizontalTimeline
            title="Medication history"
            groups={[{ 'id': 1, 'title': 'medication' }]}
            items={this.getMedicationItems()}
            stackItems={true} />
        </div>

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
