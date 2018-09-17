import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';

import TableList from '../shared/TableList';
import VerticalTimeline from '../shared/VerticalTimeline';

export default class Allergies extends Component {
  allergies() {
    return this.props.allergies.map((allergy) => {
      return { date: allergy.assertedDate, text: getDisplayString(allergy, 'code'), icon: 'allergies' };
    });
  }

  currentAllergies() {
    const currentAllergies = this.props.allergies.filter((allergy) => allergy.clinicalStatus === 'active');

    let filteredCurrentAllergies = [];
    currentAllergies.forEach((allergy, index) => {
      filteredCurrentAllergies[index] = {
        allergy: getDisplayString(allergy, 'code'),
        criticality: allergy.criticality,
        'current status': allergy.clinicalStatus
      };
    });

    return filteredCurrentAllergies;
  }

  render() {
    if (this.props.allergies.length === 0) return <div className="allergies no-entries">No entries.</div>;

    return (
      <div className="allergies">
        <TableList
          title="Current allergies list"
          headers={['allergy', 'criticality', 'current status']}
          data={this.currentAllergies()} />
        <VerticalTimeline items={this.allergies()} />
      </div>
    );
  }
}

Allergies.propTypes = {
  allergies: PropTypes.array
};

Allergies.defaultProps = {
  allergies: []
};
