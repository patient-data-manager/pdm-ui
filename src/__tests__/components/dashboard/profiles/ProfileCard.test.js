import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileCard from '../../../../components/dashboard/profiles/ProfileCard';
import * as mocks from '../../../../__mocks__/profileMocks';

function setup() {
  const props = {
    profile: mocks.profileMockA,
    activeProfile: mocks.profileMockA,
    isHeader: false,
    alertsCount: 3,
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
    setActiveProfile: jest.fn()
  };

  return fullRenderComponent(ProfileCard, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.profile-card__info')).toExist();
  expect(component.find('div.profile-card__edit-button')).toExist();
  expect(component.find('div.profile-card__icon')).toExist();
  expect(component.find('div.profile-card__details')).toExist();
});
