import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableList from '../shared/TableList';

export default class Allergies extends Component {
  currentAllergies() {
    let filteredCurrentAllergies = [];
    this.props.allergies.forEach((allergy, index) => {
      filteredCurrentAllergies[index] = {
        allergy: this.allergyText(allergy),
        criticality: allergy.criticality,
        'current status': allergy.clinicalStatus
      };
    });

    return filteredCurrentAllergies;
  }

  allergyText = (allergy) => {
    if (allergy.code !== undefined) {
      if (allergy.code.text) return allergy.code.text;
      if (allergy.code.coding[0].display) return allergy.code.coding[0].display;
    }
    return '';
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
