import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

import isValid from '../../../utils/isValid';

export default class ProviderSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProvider: null
    };
  }

  getProviderOptions(providers) {
    return providers.map((provider) => {
      return { value: provider.id, label: provider.name };
    });
  }

  onSelectChange = (event) => {
    if (isValid(event)) this.setState({ selectedProvider: event.value });
    else this.setState({ selectedProvider: null });
  };

  providerSelected = () => {
    this.props.linkProvider(this.state.selectedProvider, this.props.activeProfileId);
  }

  renderSearch = () => {
    return (
      <Select
        className="provider-select"
        isDisabled={this.props.providers.length === 0}
        isClearable={true}
        isSearchable={true}
        options={this.getProviderOptions(this.props.providers)}
        onChange={this.onSelectChange}
        placeholder="select/enter a provider name"
      />
    );
  }

  renderAddButton = () => {
    if (this.props.providers.length === 0) return null;

    return (
      <Button
        variant="contained"
        color="primary"
        disabled={!isValid(this.state.selectedProvider)}
        onClick={this.providerSelected}>
        <FontAwesomeIcon icon="plus" />
      </Button>
    );
  }

  render() {
    return (
      <div className="providers-search">
        <div className="providers-search__input">
          {this.renderSearch()}
        </div>

        <div className="providers-search__add-button">
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

ProviderSearch.propTypes = {
  providers: PropTypes.array,
  activeProfileId: PropTypes.number,
  linkProvider: PropTypes.func.isRequired
};

ProviderSearch.defaultProps = {
  providers: []
};
