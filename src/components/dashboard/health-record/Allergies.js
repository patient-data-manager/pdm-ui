import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';

import TableList from '../shared/TableList';

export default class Allergies extends Component {
  currentAllergies() {
    let filteredCurrentAllergies = [];
    this.props.allergies.forEach((allergy, index) => {
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
