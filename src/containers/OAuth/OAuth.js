import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { oauthCallback } from '../../actions/providers';

export class OAuth extends Component {

  constructor(props) {
    super(props);
    this.state = { oauth_params: this.props.location.query };
  }

  componentDidMount(){
    let params = this.state['oauth_params'];
    this.props.oauthCallback(params.state, params.code);
  }

  render() {
    return (
      <div> OAUTH!! </div>
    );
  }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({oauthCallback}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth)
