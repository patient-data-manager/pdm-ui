import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { linkProvider, loadProfileProviders } from '../../actions/providers';
import ProviderCollapsableCard from '../../components/dashboard/providers/ProviderCollapsableCard';

export class Providers extends Component {
  componentWillMount() {
    if (this.props.profile) this.props.loadProfileProviders(this.props.profile.id);
  }

  providersList = () => {
    const { providers, profileProviders } = this.props;

    let providersList = [];
    profileProviders.forEach((profileProvider) => {
      const matchingProvider = providers.filter((provider) => profileProvider.provider_id === provider.id);
      if (matchingProvider.length > 0) {
        let newProvider = matchingProvider[0];
        newProvider.addedOn = profileProvider.created_at;
        newProvider.lastUpdated = profileProvider.updated_at;
        providersList.push(newProvider);
      }
    });
    // TODO: sort alphabetically
    return providersList;
  }

  getProviderImages = () => {
    return [
      { 'name': 'Brigham and Womens', 'imageUrl': '/assets/images/provider-logos/brigham-and-womens.png' },
      { 'name': 'FitBit', 'imageUrl': '/assets/images/provider-logos/fitbit.png' },
      { 'name': 'Massachusetts General Hospital', 'imageUrl': '/assets/images/provider-logos/mgh.png' },
      { 'name': 'Partners Health Care', 'imageUrl': '/assets/images/provider-logos/partners-healthcare.png' },
      { 'name': 'smart_sandbox', 'imageUrl': '/assets/images/provider-logos/smart-sandbox.png' }
    ];
  }

  getImageUrl = (providerName) => {
    const providers = this.getProviderImages();
    const matchingProvider = providers.filter((provider) => providerName === provider.name);
    if (matchingProvider.length > 0) {
      return matchingProvider[0].imageUrl;
    }
    return null;
  }

  renderProvidersList = () => {
    const providersList = this.providersList();
    if (providersList.length === 0) return <div className="providers no-entries">No providers.</div>;

    return providersList.map((provider) => {
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
  loadProfileProviders: PropTypes.func.isRequired
};

Providers.defaultTypes = {
  providers: [],
  profileProviders: []
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    loadProfileProviders
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    providers: state.providers.providers,
    profile: state.profiles.activeProfile,
    profileProviders: state.providers.profileProviders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
