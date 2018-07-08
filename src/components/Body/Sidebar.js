import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <a href='#/profiles'>
          <li><FontAwesome name='user-circle' /> PROFILES </li>
        </a>
        <a href='#/health-record'>
          <li><FontAwesome name='file-text' /> HEALTH RECORD </li>
        </a>
        <a href='#/alerts'>
          <li><FontAwesome name='exclamation-circle' /> ALERTS </li>
        </a>
        <a href='#/providers'>
          <li><FontAwesome name='hospital-o' /> PROVIDERS </li>
        </a>
      </div>
    );
  }
}
