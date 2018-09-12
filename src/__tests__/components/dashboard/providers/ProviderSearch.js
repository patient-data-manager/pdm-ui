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
});

it('search bar hidden if no providers are passed in', () => {
  const component = setup([]);

  expect(component).toBeDefined();
  expect(component.find('div.providers-search')).toHaveLength(0);
});