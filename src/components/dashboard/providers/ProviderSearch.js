import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  }
});

class ProviderSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.providers.filter(provider =>
      provider.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  onProviderSelected(provider) {
    this.props.linkProvider(provider.id, this.props.activeProfileId);
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

  renderSuggestion = (provider, { query, isHighlighted }) => {
    const matches = match(provider.name, query);
    const parts = parse(provider.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div" className="provider-search__suggestion">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const { classes } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'type provider name to add a new provider',
      value,
      onChange: this.onChange
    };

    const onSelect = (event, props) => this.onSuggestionSelected(event, props);

    return (
      <div className="providers-search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={onSelect}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={options => (<Paper {...options.containerProps} square>{options.children}</Paper>)}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }} />
      </div>
    );
  }
}

ProviderSearch.propTypes = {
  providers: PropTypes.array,
  activeProfileId: PropTypes.number,
  linkProvider: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProviderSearch);
