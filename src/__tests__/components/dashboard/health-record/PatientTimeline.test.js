import { fullRenderComponent } from '../../../../utils/testHelpers';
import PatientTimeline from '../../../../components/dashboard/health-record/PatientTimeline';

function setup() {
  return fullRenderComponent(PatientTimeline);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});
