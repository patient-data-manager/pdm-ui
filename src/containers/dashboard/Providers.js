import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { linkProvider, loadProviders, loadProfileProviders } from '../../actions/providers';

import ProviderCollapsableCard from '../../components/dashboard/providers/ProviderCollapsableCard';

export class Providers extends Component {
  componentDidMount() {
    this.props.loadProviders();
    this.props.loadProfileProviders(this.props.profile.id);
  }

  getProviders = () => {
    return [
      { 'name': 'Partners Health Care', 'imageUrl': '/assets/images/provider-logos/partners-healthcare.png' },
      { 'name': 'Brigham and Womens', 'imageUrl': '/assets/images/provider-logos/brigham-and-womens.png' },
      { 'name': 'FitBit', 'imageUrl': '/assets/images/provider-logos/fitbit.png' },
      { 'name': 'smart_sandbox', 'imageUrl': '/assets/images/provider-logos/smart-sandbox.png' },
    ];
  }

  getImageUrl = (providerName) => {
    const providers = this.getProviders();
    const matchingProvider = providers.filter((provider) => providerName === provider.name);
    if (matchingProvider.length > 0) {
      return matchingProvider[0].imageUrl;
    }
    return null;
  }

  renderProvidersList = () => {
    if (this.props.providers.length === 0) return <div className="providers no-entries">No providers.</div>;
    
    return this.props.providers.map((provider) => {
      return (
        <ProviderCollapsableCard
          key={provider.id}
          provider={provider}
          imageUrl={this.getImageUrl(provider.name)}
        />
      );
    });
  }

  render() {
    return (
      <div className="providers">
        {/* TO-DO: insert search bar here */}
        <div className="providers-list">
          {this.renderProvidersList()}
        </div>
      </div>
    );
  }
}

Providers.propTypes = {
  providers: PropTypes.array,
  profileProviders: PropTypes.array,
  profile: PropTypes.object,
  linkProvider: PropTypes.func.isRequired,
  loadProviders: PropTypes.func.isRequired,
  loadProfileProviders: PropTypes.func.isRequired
};

Providers.defaultTypes = {
  providers: []
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    loadProviders,
    loadProfileProviders
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    providers: state.providers.providers,
    profile: state.profiles.activeProfile,
    profileProviders: state.providers.profileProviders,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
