import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Allergies extends Component {
  render() {
    return (
      <div className="allergies">
        <p>Insert allergy content here.</p>
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
