import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default class Banner extends Component {
  handleClose = (event) => {
    event.stopPropagation();
    const { close } = this.props;
    if (close) close(event);
  }

  render() {
    const { type, close, children } = this.props;

    return (
      <div className={clsx('banner', type)}>
        <div className="message"><FontAwesomeIcon icon="exclamation-circle" /> {children}</div>
        {close && <FontAwesomeIcon className="close-icon" icon="times" onClick={event => this.handleClose(event)}/>}
      </div>
    );
  }
}

Banner.propTypes = {
  type: PropTypes.string, // "notification" or "warning"
  close: PropTypes.func,
  children: PropTypes.string.isRequired
};

Banner.defaultProps = {
  type: 'notification',
  close: null
};
