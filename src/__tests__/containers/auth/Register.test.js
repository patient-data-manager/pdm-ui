import { fullRenderContainer } from '../../../utils/testHelpers';
import Register from '../../../containers/auth/Register';

function setup() {
  const store = {
    auth: {
      registrationStatusText: 'test registration status'
    }
  };

  const props = {
    registrationStatusText: '',
    registerUser: jest.fn(),
    resetRegistrationStatus: jest.fn()
  };

  return fullRenderContainer(Register, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('.register__image')).toExist();
  expect(component.find('.register__form')).toExist();
  expect(component.find('.register__login-link')).toExist();
  expect(component.find('.auth-button')).toExist();
});

it('renders all text inputs correctly', () => {
  const component = setup();

  expect(component.find('div.register__textfield')).toHaveLength(5);
  expect(component.find('div.register__textfield').at(0).find('label')).toHaveText('FIRST NAME');
  expect(component.find('div.register__textfield').at(1).find('label')).toHaveText('LAST NAME');
  expect(component.find('div.register__textfield').at(2).find('label')).toHaveText('EMAIL');
  expect(component.find('div.register__textfield').at(3).find('label')).toHaveText('PASSWORD');
  expect(component.find('div.register__textfield').at(4).find('label')).toHaveText('CONFIRM PASSWORD');
});

it('validates all text inputs correctly', () => {
  const component = setup();

  // required fields
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(0)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(1)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(2)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(3)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(4)).toHaveText('this field is required');

  // email
  const emailInput = component.find('div.register__textfield').at(2).find('input');
  expect(emailInput.prop('value')).toEqual('');
  emailInput.simulate('change', { target: { value: 'test.com' } });
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(2)).toHaveText('email is not valid');

  // password
  const passwordInput = component.find('div.register__textfield').at(3).find('input');
  expect(passwordInput.prop('value')).toEqual('');
  passwordInput.simulate('change', { target: { value: 'abc' } });
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(3)).toHaveText('does not meet complexity requirements');

  // confirm password
  const confirmPasswordInput = component.find('div.register__textfield').at(4).find('input');
  passwordInput.simulate('change', { target: { value: 'abcdef' } });
  confirmPasswordInput.simulate('change', { target: { value: 'abcdefg' } });
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(3)).toHaveText('does not match password');
});

it('renders the auth status text correctly', () => {
  const component = setup();

  expect(component.find('.auth-message.auth-error')).toHaveText('test registration status');
});
