import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Body/Sidebar';
import ProfileList from './ProfileList';
import { fetchProfiles } from '../../actions/profiles';

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfiles();
  }

  render() {
    return (
      <div className='content-wrapper'>
        <Header isAuthenticated={false} authUser={null} logoutUser={() => {}} />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            <ProfileList profiles={this.props.profiles}/>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profiles: PropTypes.array,
  fetchProfiles: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProfiles
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
