import React, { Component } from 'react';
import Landing from '../components/Landing';

export default class App extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="app">
        <Landing />
        {children}
      </div>
    );
  }
}

App.displayName = 'App';
