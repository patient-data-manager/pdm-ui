import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileForm from '../../../../components/dashboard/profiles/ProfileForm';
import { profileMockA, profileMockB, profileMockC } from '../../../../__mocks__/profileMocks';

function setup(profile) {
  const props = {
    profile,
    showDelete: true,
    saveProfile: jest.fn(),
    deleteProfile: jest.fn(),
    cancel: jest.fn()
  };

  return fullRenderComponent(ProfileForm, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('form.profile-form__form')).toExist();
  expect(component.find('div.profile-form__form-group')).toHaveLength(8);
  expect(component.find('div.profile-form__buttons')).toExist();
});

it('validates all text inputs correctly', () => {
  const component = setup();

  // required fields
  component.find('form').simulate('submit');
  expect(component.find('FormHelperText').at(0)).toHaveText('this field is required');
  expect(component.find('FormHelperText').at(1)).toHaveText('this field is required');
});

it('renders a profile picture correctly', () => {
  const component = setup(profileMockC);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo img[src="http://localhost:3001/photo.jpg"]')).toHaveLength(1);
});

it('renders self placeholder image correctly', () => {
  const component = setup(profileMockA);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo').find('svg').prop('xmlns')).toEqual('http://www.w3.org/2000/svg');
});

it('renders other placeholder image correctly', () => {
  const component = setup(profileMockB);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo').find('svg').prop('data-icon')).toEqual('user-circle');
});
