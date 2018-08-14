import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { linkProvider, loadProviders } from '../../actions/providers';

export class Providers extends Component {
  componentDidMount() {
    this.props.loadProviders();
  }

  renderProvider = (provider) => {
    if (!provider || !this.props.profile) return;
    const profileId = this.props.profile.id;

    return (
      <div className="provider" key={provider.id}>
        <button
          className="button button-secondary"
          onClick={() => this.props.linkProvider(provider.id, profileId)}>
          {provider.name}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="providers">
        {this.props.providers.map(provider => this.renderProvider(provider))}
      </div>
    );
  }
}

Providers.propTypes = {
  providers: PropTypes.array,
  profile: PropTypes.object,
  linkProvider: PropTypes.func.isRequired,
  loadProviders: PropTypes.func.isRequired
};

Providers.defaultTypes = {
  providers: []
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    loadProviders
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    providers: state.providers.providers,
    profile: state.profiles.activeProfile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
