import { fullRenderComponent } from '../../../../utils/testHelpers';
import Conditions from '../../../../components/dashboard/health-record/Conditions';

function setup() {
  return fullRenderComponent(Conditions);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.conditions')).toExist();
});