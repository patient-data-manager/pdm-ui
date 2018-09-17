import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayString from '../../../utils/getDisplayString';
import isValid from '../../../utils/isValid';

import VerticalTimeline from '../shared/VerticalTimeline';

export default class Immunizations extends Component {
  immunizations() {
    return this.props.immunizations.map((immunization) => {
      return { date: immunization.date, text: getDisplayString(immunization, 'vaccineCode'), icon: 'syringe' };
    });
  }
  
  immunizationText = (immunization) => {
    if (isValid(immunization.vaccineCode)) {
      if (immunization.vaccineCode.text) return immunization.vaccineCode.text;
      if (immunization.vaccineCode.coding[0].display) return immunization.vaccineCode.coding[0].display;
    }
    return '';
  }

  render() {
    if (this.props.immunizations.length === 0) return <div className="immunizations no-entries">No entries.</div>;

    return (
      <div className="immunizations">
        <VerticalTimeline items={this.immunizations()} />
      </div>
    );
  }
}

Immunizations.propTypes = {
  immunizations: PropTypes.array
};

Immunizations.defaultProps = {
  immunizations: []
};
