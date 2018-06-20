import React, { Component } from 'react';
import robot from '../../../public/landing/robot.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <a className="logo navbar-brand" href="/">
        <span><img className="header-logo"  src={robot} width="25px" /></span>
        <span className="topper"> MyHealthEData</span>
      </a>
    );
  }
}

Logo.displayName = 'Logo';
