import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Alerts extends Component {
  render() {
    return (
      <div className='alerts'></div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Alerts);
