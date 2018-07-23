import { fullRenderComponent } from '../../../../utils/testHelpers';
import Summary from '../../../../components/dashboard/health-record/Summary';
import { patientMock } from '../../../../__mocks__/patientMocks';
import { profileMockA } from '../../../../__mocks__/profileMocks';

function setup() {
  return fullRenderComponent(Summary, { patient: patientMock, profile: profileMockA });
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('.summary__image')).toExist();
  expect(component.find('.summary__divider')).toExist();
  expect(component.find('.summary__table')).toExist();
  expect(component.find('.summary__table-row')).toHaveLength(6);
});
