import { fullRenderComponent } from '../../../utils/testHelpers';
import HealthRecord from '../../../containers/dashboard/HealthRecord';

function setup() {
  const store = {
    auth: {
      accessToken: 'abcd'
    }
  };
  const props = {};

  return fullRenderComponent(HealthRecord, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});
