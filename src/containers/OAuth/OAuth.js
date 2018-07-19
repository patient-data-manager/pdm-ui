import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { oauthCallback } from '../../actions/providers';
import queryString from 'query-string';

export class OAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { oauth_params: queryString.parse(this.props.location.search) };
  }

  componentDidMount(){
    const params = this.state.oauth_params;
    this.props.oauthCallback(params.state, params.code);
  }

  render() {
    return (
      // TODO: where to redirect to?
      // assume either the record to show new stuff popping in
      // or
      // the list of providers that are registered
      <Redirect to='/dashboard/providers' />
    );
  }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ oauthCallback }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth)
