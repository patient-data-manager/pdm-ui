import { fullRenderContainer } from '../../../utils/testHelpers';
import Alerts from '../../../containers/dashboard/Alerts';

function setup() {
  const store = {};
  const props = {};

  return fullRenderContainer(Alerts, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.alerts')).toExist();
});
