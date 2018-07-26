import { fullRenderComponent } from '../../../../utils/testHelpers';
import Immunizations from '../../../../components/dashboard/health-record/Immunizations';

function setup() {
  return fullRenderComponent(Immunizations);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.immunizations')).toExist();
});