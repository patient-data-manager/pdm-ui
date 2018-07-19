import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { linkProvider, fetchProviders } from '../../actions/providers';

export class Providers extends Component {
  componentDidMount(){
    this.props.fetchProviders();
  }

  renderProvider(provider){
    const profileId = this.props.profile.id;

    return (
      <div className='providers'>
        <a
          onClick={this.props.linkProvider(provider.id, profileId)}
          onKeyPress={this.props.linkProvider(provider.id, profileId)}
          role='button'
          tabIndex={-1}
        >
          {provider.name}
        </a>
      </div>
    );
  }

  render() {
    const providers = (this.props.providers || []).map(provider => this.renderProvider(provider));

    return (
      <div className='providers'>
        {providers}
      </div>
    );
  }
}

Providers.propTypes = {
  providers: PropTypes.array,
  profile: PropTypes.object,
  linkProvider: PropTypes.func.isRequired,
  fetchProviders: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    fetchProviders
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    providers: state.providers.providers,
    profile: state.profiles.activeProfile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
