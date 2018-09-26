import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { linkProvider, loadProfileProviders } from '../../actions/providers';

import ProviderCard from '../../components/dashboard/providers/ProviderCard';
import ProviderSearch from '../../components/dashboard/providers/ProviderSearch';

export class Providers extends Component {
  componentWillMount() {
    if (this.props.activeProfileId) {
      this.props.loadProfileProviders(this.props.activeProfileId);
    }
  }

  providersList = () => {
    const { providers, profileProviders } = this.props;
    if (providers.length === 0 || profileProviders.length === 0) return [];

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
    return _.orderBy(providersList, ['name'], ['asc']);
  }

  renderProviderList = () => {
    const providersList = this.providersList();
    if (providersList.length === 0) return <div className="providers no-entries">No linked providers.</div>;

    return providersList.map((provider) => {
      return (
        <ProviderCard
          key={provider.id}
          provider={provider} />
      );
    });
  }

  render() {
    return (
      <div className="providers">
        <ProviderSearch
          providers={_.orderBy(this.props.providers, ['name'], ['asc'])}
          activeProfileId={this.props.activeProfileId}
          linkProvider={this.props.linkProvider} />

        <div className="providers-list">
          {this.renderProviderList()}
        </div>
      </div>
    );
  }
}

Providers.propTypes = {
  activeProfileId: PropTypes.number,
  providers: PropTypes.array,
  profileProviders: PropTypes.array,
  linkProvider: PropTypes.func.isRequired,
  loadProfileProviders: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    linkProvider,
    loadProfileProviders
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    activeProfileId: state.profiles.activeProfileId,
    providers: state.providers.providers,
    profileProviders: state.providers.profileProviders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
