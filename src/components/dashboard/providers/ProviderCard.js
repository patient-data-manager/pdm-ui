import React, { Component } from 'react';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div> {this.props.provider.name} </div>;
  }
}