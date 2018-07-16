import React, { Component } from 'react';
import { connect } from 'react-redux';

export class HealthRecord extends Component {
  render() {
    return (
      <div className="health-record"></div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(HealthRecord);
