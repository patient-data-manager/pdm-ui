import { fullRenderContainer } from '../../utils/testHelpers';
import Profile from '../../containers/Profile/Profile';

function setup() {
  const store = {
    isAuthenticated: false
  };

  const props = {};

  return fullRenderContainer(Profile, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});