import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export default class Immunizations extends Component {
  render() {
    return (
      <div className="health-record__medications">
        <VerticalList
          list={this.immunizations()}
          listType="medications"
          dateProperty="date"
          descriptionProperty="text"/>
      </div>
    );
  }

  immunizations() {
    return this.props.immunizations.map((immunization) => {
      return { date: immunization.date, text: immunization.vaccineCode.text };
    });
  }
}
