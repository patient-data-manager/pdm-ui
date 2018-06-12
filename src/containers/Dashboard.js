import React, { Component } from 'react';
import Header from '../components/Header/Header'
export default class Dashboard extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="content-wrapper">
        <Header/>
        <div className="">
        </div>
      </div>
    );
  }
}
