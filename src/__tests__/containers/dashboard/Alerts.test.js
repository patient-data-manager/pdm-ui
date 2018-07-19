import { fullRenderComponent } from '../../../utils/testHelpers';
import Alerts from '../../../containers/dashboard/Alerts';

function setup() {
  const store = {
    auth: {
      accessToken: 'abcd'
    }
  };
  const props = {};

  return fullRenderComponent(Alerts, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});