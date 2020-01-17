import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';

// Custom wrapper component to allow using a token from state
// in the URL provided to the ActionCableProvider
class TokenActionCableProvider extends Component {
  render() {
    const { url, token, children } = this.props;
    return (
      <ActionCableProvider url={`${url}?token=${token}`}>
        {children}
      </ActionCableProvider>
    );
  }
}

TokenActionCableProvider.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    token: state.auth.accessToken
  };
}

export default withRouter(connect(mapStateToProps)(TokenActionCableProvider));
