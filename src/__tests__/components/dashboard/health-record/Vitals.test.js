import { fullRenderComponent } from '../../../../utils/testHelpers';
import Vitals from '../../../../components/dashboard/health-record/Vitals';

function setup() {
  return fullRenderComponent(Vitals);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.vitals')).toExist();
});