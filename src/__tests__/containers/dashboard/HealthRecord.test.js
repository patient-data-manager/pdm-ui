import { fullRenderContainer } from '../../../utils/testHelpers';
import HealthRecord from '../../../containers/dashboard/HealthRecord';
import { profileMockA } from '../../../__mocks__/profileMocks';
import { healthRecordMock } from '../../../__mocks__/healthRecordMocks';

function setup() {
  const store = {
    healthRecords: {
      healthRecord: healthRecordMock
    },
    profiles: {
      activeProfile: profileMockA,
      loadProfiles: {
        isLoading: false
      }
    }
  };
  const props = {};

  return fullRenderContainer(HealthRecord, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
});
