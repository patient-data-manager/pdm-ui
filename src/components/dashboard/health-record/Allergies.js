import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableList from '../shared/TableList';

export default class Allergies extends Component {

  getCurrentAllergies() {
    let filteredCurrentAllergies = [];
    this.props.allergies.forEach((allergy, index) => {
      filteredCurrentAllergies[index] = {
        allergy: allergy.code.text,
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
          data={this.getCurrentAllergies()}
          sort={{ order: 'asc' , orderBy: 0 }} />
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
