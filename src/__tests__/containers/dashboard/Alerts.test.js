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

it('renders the alerts lists', () => {
  const component = setup();

  expect(component.find('div.alerts-list')).toHaveLength(2);
  expect(component.find('div.alerts-list__title').at(0).text()).toEqual('Alerts (insert count here)');
  expect(component.find('div.alerts-list__title').at(1).text()).toEqual('Recently Approved');
  expect(component.find('div.vertical-timeline')).toHaveLength(1);
});
