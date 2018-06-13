import React, { Component } from 'react';
import { logOut } from '../../actions/current_user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';

export class Logout extends Component {

  componentWillMount() {
    this.props.logOut();
    (this.props.hashHistory || hashHistory).push('/');
  }

  render() {
    return (
      <div>Logging out</div>
    );
  }

  handleChange(field) {
    return (event) => {
      let newState = {};
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }
}

function mapStateToProps(state) {
  console.log("State update");
  console.log(state);
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logOut}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
