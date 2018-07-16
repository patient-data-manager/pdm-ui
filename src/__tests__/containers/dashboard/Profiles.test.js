import { fullRenderContainer } from '../../../utils/testHelpers';
import Profiles from '../../../containers/dashboard/Profiles';
import * as mocks from '../../../__mocks__/profileMocks';

function setup() {
  const store = {
    auth: {
      accessToken: 'abcd'
    },
    profiles: {
      profiles: [mocks.profileMockA, mocks.profileMockB, mocks.profileMockC],
      activeProfileId: 1,
      activeProfile: mocks.profileMockA,
      statusMessage: null
    }
  };

  const props = {
    profiles: [mocks.profileMockA],
    activeProfile: mocks.profileMockA,
    accessToken: 'abcd',
    loadProfiles: jest.fn(),
    addProfile: jest.fn(),
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
    setActiveProfile: jest.fn()
  };

  return fullRenderContainer(Profiles, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('.profiles__flip-list')).toExist();
  expect(component.find('.profiles__new')).toExist();
});

it('renders all profile cards', () => {
  const component = setup();

  expect(component.find('div.profile-card')).toHaveLength(3);
});
