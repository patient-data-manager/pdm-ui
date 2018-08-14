import { fullRenderContainer } from '../../../utils/testHelpers';
import Providers from '../../../containers/dashboard/Providers';
import { profileMockA } from '../../../__mocks__/profileMocks';
import * as mocks from '../../../__mocks__/providerMocks';

function setup() {
  const store = {
    profiles: {
      activeProfile: profileMockA,
    },
    providers: {
      providers: [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC],
    }
  };

  const props = {
    providers: [mocks.providerMockA, mocks.providerMockB, mocks.providerMockC],
    profile: mocks.profileMockA,
    linkProviders: jest.fn(),
    loadProviders: jest.fn(),
  };

  return fullRenderContainer(Providers, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.providers')).toExist();
});

it('renders all providers', () => {
  const component = setup();

  expect(component.find('div.provider')).toHaveLength(3);
  expect(component.find('div.provider > button').at(0).text()).toEqual('Fitbit');
  expect(component.find('div.provider > button').at(1).text()).toEqual('Massachusetts General Hospital');
  expect(component.find('div.provider > button').at(2).text()).toEqual('Partners Health Care');
});
