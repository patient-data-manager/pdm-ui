import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileCard from '../../../../components/dashboard/profiles/ProfileCard';
import { profileMockA, profileMockB, profileMockC } from '../../../../__mocks__/profileMocks';

function setup(profile) {
  const props = {
    profile,
    activeProfile: profile,
    isHeader: false,
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
    setActiveProfile: jest.fn()
  };

  return fullRenderComponent(ProfileCard, props);
}

it('renders self and self components', () => {
  const component = setup(profileMockC);

  expect(component).toBeDefined();
  expect(component.find('div.profile-card__info')).toExist();
  expect(component.find('div.profile-card__edit-button')).toExist();
  expect(component.find('div.profile-card__image')).toExist();
  expect(component.find('div.profile-card__details')).toExist();
});

it('renders a profile picture correctly', () => {
  const component = setup(profileMockC);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image img[src="http://localhost:3001/photo.jpg"]')).toHaveLength(1);
});

it('renders self placeholder image correctly', () => {
  const component = setup(profileMockA);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image').find('svg').prop('xmlns')).toEqual('http://www.w3.org/2000/svg');
});

it('renders other placeholder image correctly', () => {
  const component = setup(profileMockB);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image').find('svg').prop('data-icon')).toEqual('user-circle');
});

// TO-DO: add in alert badge testing
