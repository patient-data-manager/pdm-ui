import { fullRenderContainer } from '../../utils/testHelpers';
import Landing from '../../containers/Landing';

function setup({ isAuthenticated = false } = {}) {
  const store = {
    auth: {
      isAuthenticated
    }
  };

  return fullRenderContainer(Landing, {}, store);
}

it('renders the log in and register buttons when not logged in', () => {
  const component = setup();

  expect(component.find('a[href="/login"]')).toExist();
  expect(component.find('a[href="/register"]')).toExist();
});

it('renders the dashboard button when logged in', () => {
  const component = setup({ isAuthenticated: true });

  expect(component.find('a[href="/dashboard/profiles"]')).toExist();
});

it('renders the footer correctly', () => {
  const component = setup();

  expect(component.find('Footer')).toExist();
});
