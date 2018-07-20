import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Allergies extends Component {
  render() {
    return (
      <div className="allergies">
        <div className="allergies__table-label">Current allergy list</div>
        <div className="allergies__table">
          <div className="allergies__table-row allergies__table-header">
            <div className="allergies__table-allergy"> <span>allergy</span> </div>
            <div className="allergies__table-severity"> <span>severity</span> </div>
            <div className="allergies__table-effects"> <span>effects</span> </div>
          </div>

          {/* populate with actual data */}
          <div className="allergies__table-row">
            <div className="allergies__table-allergy"> allergy </div>
            <div className="allergies__table-severity"> severity </div>
            <div className="allergies__table-effects"> effects </div>
          </div>
          <div className="allergies__table-row">
            <div className="allergies__table-allergy"> allergy </div>
            <div className="allergies__table-severity"> severity </div>
            <div className="allergies__table-effects"> effects </div>
          </div>
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
