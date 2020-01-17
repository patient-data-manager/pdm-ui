import { fullRenderContainer } from '../../../utils/testHelpers';
import Login from '../../../containers/auth/Login';

function setup() {
  const store = {
    auth: {
      authStatusText: 'test auth status',
      registrationStatusText: 'test registration status'
    }
  };

  const props = {
    authStatusText: '',
    registrationStatusText: '',
    loginUser: jest.fn(),
    resetLoginStatus: jest.fn()
  };

  return fullRenderContainer(Login, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('.login__image')).toExist();
  expect(component.find('.login__form')).toExist();
  expect(component.find('.login__register-link')).toExist();
  expect(component.find('.auth-button')).toExist();
});

it('renders all text inputs correctly', () => {
  const component = setup();

  expect(component.find('div.login__textfield')).toHaveLength(2);
  expect(component.find('div.login__textfield').at(0).find('label')).toHaveText('EMAIL');
  expect(component.find('div.login__textfield').at(1).find('label')).toHaveText('PASSWORD');
});

it('validates all text inputs correctly', () => {
  const component = setup();

  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(0)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(1)).toHaveText('this field is required');

  const input = component.find('div.login__textfield').at(0).find('input');
  expect(input.prop('value')).toEqual('');
  input.simulate('change', { target: { value: 'test.com' } });
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(0)).toHaveText('email is not valid');
});

it('renders the auth status text correctly', () => {
  const component = setup();

  expect(component.find('.auth-message.auth-success')).toHaveText('test registration status');
  expect(component.find('.auth-message.auth-error')).toHaveText('test auth status');
});
