import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

class ProviderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onProviderSelected(provider) {
    this.props.linkProvider(provider.id, this.props.profile.id);
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.providers.filter(profile =>
      profile.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  renderSuggestion(provider) {
    return (<div>{provider.name}</div>);
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  onSuggestionSelected = (event, props) => {
    this.onProviderSelected(props.suggestion);
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for providers',
      value,
      onChange: this.onChange
    };
    const onSelect = (event, props) => this.onSuggestionSelected(event, props);
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSelect}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

ProviderSearch.propTypes = {
  providers: PropTypes.array,
  profile: PropTypes.object,
  linkProvider: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    providers: state.providers.providers
  };
}

export default connect(mapStateToProps)(ProviderSearch);
