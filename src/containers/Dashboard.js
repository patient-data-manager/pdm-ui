import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="content-wrapper">
        <div className="">
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
