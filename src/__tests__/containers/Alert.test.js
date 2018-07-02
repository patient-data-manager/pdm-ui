import { fullRenderContainer } from '../../utils/testHelpers';
import Alert from '../../containers/Alert/Alert';

function setup() {
  const store = {};

  const props = {};

  return fullRenderContainer(Alert, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});
