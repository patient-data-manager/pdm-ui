import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileForm from '../../../../components/dashboard/profiles/ProfileForm';

function setup() {
  const props = {
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
