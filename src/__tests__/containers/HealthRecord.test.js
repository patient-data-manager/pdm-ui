import { fullRenderContainer } from '../../utils/testHelpers';
import HealthRecord from '../../containers/HealthRecord/HealthRecord';

function setup() {
  const store = {};

  const props = {};

  return fullRenderContainer(HealthRecord, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});