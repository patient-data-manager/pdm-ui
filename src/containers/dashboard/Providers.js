import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileCard from '../../components/dashboard/profiles/ProfileCard';

export class Provider extends Component {

  componentDidMount(){
    this.props.fetchProviders();
  }

  render() {
    const providers = (this.props.providers || []).map((p) => this.renderProvider(p));

    return (
      <div className='content-wrapper'>
        <div className='dashboard-body'>

          <div className='dashboard-content'>
            {this.props.profile ? <ProfileCard profile={this.props.profile}/> : ''}
           {providers}
          </div>
        </div>
      </div>
    );
  }
  renderProvider(p){
    return(
      <div>
        <a onClick={() => this.props.linkProvider(p.id, this.props.profile.id)}> {p.name} </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    providers: state.providers,
    profile: state.profiles.activeProfile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    fetchProviders
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Provider)
