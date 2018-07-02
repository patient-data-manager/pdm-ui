import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PageHeader extends Component {
  render() {
    return (
      <div className="page-header">
        <div className="page-header-text">{this.props.title}</div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};
