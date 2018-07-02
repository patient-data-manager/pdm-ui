import { fullRenderContainer } from '../../utils/testHelpers';
import Provider from '../../containers/Provider/Provider';

function setup() {
  const store = {
    isAuthenticated: false
  };

  const props = {};

  return fullRenderContainer(Provider, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});