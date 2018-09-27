import { fullRenderContainer } from '../../../utils/testHelpers';
import HealthRecord from '../../../containers/dashboard/HealthRecord';
import { profileMockA } from '../../../__mocks__/profileMocks';
import { healthRecordMock } from '../../../__mocks__/healthRecordMocks';

function setup() {
  const store = {
    healthRecords: {
      healthRecord: healthRecordMock,
      loadHealthRecord: {
        isLoading: false
      }
    },
    profiles: {
      activeProfile: profileMockA,
      loadProfiles: {
        isLoading: false
      }
    },
    dashboard: {
      navIsOpen: false
    }
  };
  const props = {};

  return fullRenderContainer(HealthRecord, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.health-record__toc')).toExist();
  expect(component.find('div.health-record__content')).toExist();
});
