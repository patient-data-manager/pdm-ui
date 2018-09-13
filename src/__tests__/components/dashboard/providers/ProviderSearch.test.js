import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProviderSearch from '../../../../components/dashboard/providers/ProviderSearch';
import * as mocks from '../../../../__mocks__/providerMocks';

function setup(providers) {
  const props = {
    providers: providers,
    activeProfileId: 1,
    linkProvider: jest.fn(),
    classes: {
      container: 'ProviderSearch-container-161',
      divider: 'ProviderSearch-divider-165',
      root: 'ProviderSearch-root-160',
      suggestion: 'ProviderSearch-suggestion-163',
      suggestionsContainerOpen: 'ProviderSearch-suggestionsContainerOpen-162',
      suggestionsList: 'ProviderSearch-suggestionsList-164'
    }
  };

  return fullRenderComponent(ProviderSearch, props);
}

it('renders self and self components', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC, mocks.providerMockD];
  const component = setup(providers);

  expect(component).toBeDefined();
  expect(component.find('div.providers-search')).toExist();
  expect(component.find('div.providers-search__input')).toExist();
  expect(component.find('div.providers-search__add-button')).toExist();
});

it('initially renders search bar correctly', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC, mocks.providerMockD];
  const component = setup(providers);

  expect(component.find('div.provider-select')).toExist();
  expect(component.find('div.provider-select').find('input')).toExist();
  expect(component.find('div.provider-select').find('input').prop('disabled')).toEqual(false);
});

it('search bar disabled and add button hidden if no providers are passed in', () => {
  const component = setup([]);

  expect(component.find('div.provider-select')).toExist();
  expect(component.find('div.provider-select').find('input').prop('disabled')).toEqual(true);
  expect(component.find('div.providers-search__add-button').find('button')).toHaveLength(0);
});

it('initially renders add button correctly', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC, mocks.providerMockD];
  const component = setup(providers);

  expect(component.find('div.providers-search__add-button').find('button').prop('disabled')).toEqual(true);
  expect(component.find('div.providers-search__add-button').find('svg').prop('data-icon')).toEqual('plus');
});

it('add button is enabled/disabled when a provider is selected/remocved', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC, mocks.providerMockD];
  const component = setup(providers);

  expect(component.find('div.providers-search__add-button').find('button').prop('disabled')).toEqual(true);
  component.setState({ selectedProvider: 1 });
  expect(component.find('div.providers-search__add-button').find('button').prop('disabled')).toEqual(false);
  component.setState({ selectedProvider: null });
  expect(component.find('div.providers-search__add-button').find('button').prop('disabled')).toEqual(true);
});