import { fullRenderContainer } from '../../../utils/testHelpers';
import Providers from '../../../containers/dashboard/Providers';
import { profileMockA } from '../../../__mocks__/profileMocks';
import * as mocks from '../../../__mocks__/providerMocks';

function setup(providers) {
  const store = {
    profiles: {
      activeProfile: profileMockA,
    },
    providers: {
      providers: providers,
    }
  };

  const props = {
    providers: providers,
    profile: mocks.profileMockA,
    linkProviders: jest.fn(),
    loadProviders: jest.fn(),
  };

  return fullRenderContainer(Providers, props, store);
}

it('renders self and self components', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC];
  const component = setup(providers);

  expect(component).toBeDefined();
  expect(component.find('div.providers')).toExist();
});

it('renders all providers', () => {
  const providers = [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC];
  const component = setup(providers);

  expect(component.find('div.providers-list')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
  expect(component.find('div.provider-card')).toHaveLength(3);
  expect(component.find('div.provider-card__titlebar-name').at(0).text()).toEqual('Fitbit');
  expect(component.find('div.provider-card__titlebar-name').at(1).text()).toEqual('Massachusetts General Hospital');
  expect(component.find('div.provider-card__titlebar-name').at(2).text()).toEqual('Partners Health Care');
});

it('displays no entries message if no vital entries are present', () => {
  const component = setup([]);

  expect(component.find('div.providers-list')).toExist();
  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.provider-card')).toHaveLength(0);
});
