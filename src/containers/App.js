import React, { Component } from 'react';

import Header from '../components/Header/Header';

export default class App extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="app">
        <Header />
        {children}
      </div>
    );
  }
}

App.displayName = 'App';
