import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalList from '../shared/VerticalList';

export default class Conditions extends Component {
  render() {
    return (
      <div className="health-record__conditions">
        <VerticalList
          list={this.conditions()}
          listType="conditions"
          dateProperty="date"
          descriptionProperty="text"/>
      </div>
    );
  }

  conditions() {
    return this.props.conditions.map((condition) => {
      return { date: condition.onsetDateTime, text: condition.code.text };
    });
  }
}

Conditions.propTypes = {
  conditions: PropTypes.array
};

Conditions.defaultProps = {
  conditions: []
};
