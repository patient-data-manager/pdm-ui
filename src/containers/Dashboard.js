import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Sidebar from '../components/Body/Sidebar'

export default class Dashboard extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="content-wrapper">
        <Header />
        <Sidebar />
      </div>
    );
  }
}
