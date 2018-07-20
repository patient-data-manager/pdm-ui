import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Allergies extends Component {
  render() {
    const allergies = this.props.allergies.sort(((a, b) => b.clinicalStatus < a.clinicalStatus));

    return (
      <div className="allergies">
        <div className="allergies__table-label">Current allergy list</div>
        <div className="allergies__table">
          <div className="allergies__table-row allergies__table-header">
            <div className="allergies__table-allergy"><span> allergy</span></div>
            <div className="allergies__table-severity"><span> severity</span></div>
            <div className="allergies__table-status"><span> current status</span></div>
          </div>
          {allergies.map((allergy) => 
            <div key={allergy.id} className="allergies__table-row">
              <div className="allergies__table-allergy"> {allergy.code.text}</div>
              <div className="allergies__table-severity"> {allergy.criticality}</div>
              <div className="allergies__table-status"> {allergy.clinicalStatus}</div>
            </div>
          )}
        </div>
        <div className="no-entries">No entries.</div>
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
