import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';

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

export default connect(mapStateToProps)(TokenActionCableProvider);