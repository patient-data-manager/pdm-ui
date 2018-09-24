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
  expect(component.find('div.profile-card').at(0).find('div.details-name').text()).toEqual('Jane E Doe');
  expect(component.find('div.profile-card').at(1).find('div.details-name').text()).toEqual('John Doe');
  expect(component.find('div.profile-card').at(2).find('div.details-name').text()).toEqual('Jenny Doe');
});

it('clicking the new button opens profile form', () => {
  const component = setup();

  expect(component.find('div.profiles__new-button')).toExist();
  expect(component.find('div.profile-form')).toHaveLength(0);

  component.find('div.profiles__new-button').find('button').simulate('click');
  expect(component.find('div.profiles__new-form-title')).toExist();
  expect(component.find('div.profiles__new-form-label').text()).toEqual('Create new profile:');
  expect(component.find('div.profile-form')).toExist();
});
