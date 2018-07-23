import { fullRenderComponent } from '../../../../utils/testHelpers';
import Procedures from '../../../../components/dashboard/health-record/Procedures';

function setup() {
  return fullRenderComponent(Procedures);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.procedures')).toExist();
});