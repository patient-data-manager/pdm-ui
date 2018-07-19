import { fullRenderComponent } from '../../../../utils/testHelpers';
import Labs from '../../../../components/dashboard/health-record/Labs';

function setup() {
  return fullRenderComponent(Labs);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.health-record__labs')).toExist();
});