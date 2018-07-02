import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutUser } from '../actions/auth';

import Header from '../components/Header/Header'
import Sidebar from '../components/Body/Sidebar'

class Dashboard extends Component {
  render() {
    let { children } = this.props; //eslint-disable-line

    return (
      <div className="content-wrapper">
        <Header
          isAuthenticated={this.props.isAuthenticated}
          authUser={this.props.authUser}
          logoutUser={this.props.logoutUser}/>

        <div className='dashboard-body'>
          <Sidebar />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authUser: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: state.auth.username
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
