import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Allergies extends Component {
  render() {
    return (
      <div className="allergies">
        <div className="allergies__table-label">Current allergy list</div>
        <div className="allergies__table">
          <div className="allergies__table-row allergies__table-header">
            <div className="allergies__table-allergy"><span> allergy</span></div>
            <div className="allergies__table-severity"><span> severity</span></div>
            <div className="allergies__table-status"><span> current status</span></div>
          </div>

          {this.props.allergies.map((allergy, index) => 
            <div key={index} className="allergies__table-row">
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
