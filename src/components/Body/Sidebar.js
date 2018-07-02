import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Link to="/profiles">
          <li><FontAwesome name="user-circle" /> PROFILES </li>
        </Link>
        <Link to="/health-record">
          <li><FontAwesome name="file-text" /> HEALTH RECORD </li>
        </Link>
        <Link to="/alerts">
          <li><FontAwesome name="exclamation-circle" /> ALERTS </li>
        </Link>
        <Link to="/providers">
          <li><FontAwesome name="hospital-o" /> PROVIDERS </li>
        </Link>
      </div>
    );
  }
}
