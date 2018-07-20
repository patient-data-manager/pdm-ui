import { fullRenderComponent } from '../../../../utils/testHelpers';
import Allergies from '../../../../components/dashboard/health-record/Allergies';

function setup() {
  return fullRenderComponent(Allergies);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.allergies')).toExist();
});