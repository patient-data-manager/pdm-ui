import { fullRenderComponent } from '../../../../utils/testHelpers';
import Summary from '../../../../components/dashboard/health-record/Summary';
import { healthRecordMockA, healthRecordMockB } from '../../../../__mocks__/healthRecordMocks';
import { patientMock } from '../../../../__mocks__/patientMocks';
import { profileMockA, profileMockB, profileMockC, profileMockD } from '../../../../__mocks__/profileMocks';

function setup(profile, healthRecord) {
  let props = {
    patient: patientMock,
    profile,
    healthRecord
  };

  return fullRenderComponent(Summary, props);
}

it('renders self and self components', () => {
  const component = setup(profileMockB, healthRecordMockA);

  expect(component).toBeDefined();
  expect(component.find('div.summary__image')).toExist();
  expect(component.find('div.summary__divider')).toExist();
  expect(component.find('div.summary__table')).toExist();
  expect(component.find('div.summary__table-row')).toHaveLength(6);
  expect(component.find('div.summary__timeline')).toExist();
});

it('does not display timeline if there is no health record', () => {
  const component = setup(profileMockB);
  expect(component.find('div.horizontal-timeline')).toHaveLength(0);
});

it('does not display timeline if there are no items', () => {
  const component = setup(profileMockB, healthRecordMockB);
  expect(component.find('div.horizontal-timeline')).toHaveLength(0);
});

it('renders self and self components', () => {
  const component = setup(profileMockB);

  expect(component).toBeDefined();
  expect(component.find('.summary__image')).toExist();
  expect(component.find('.summary__divider')).toExist();
  expect(component.find('.summary__table')).toExist();
});

it('renders table rows correctly', () => {
  const component = setup(profileMockB);

  expect(component.find('.summary__table-row')).toHaveLength(6);
  expect(component.find('.summary__table-key').at(0).text()).toEqual('Name');
  expect(component.find('.summary__table-value').at(0).text()).toEqual('John Doe');
  expect(component.find('.summary__table-key').at(1).text()).toEqual('Gender');
  expect(component.find('.summary__table-value').at(1).text()).toEqual('male');
  expect(component.find('.summary__table-key').at(2).text()).toEqual('DOB');
  expect(component.find('.summary__table-value').at(2).text()).toEqual('Jul 21, 2002 (age 17)');
  expect(component.find('.summary__table-key').at(3).text()).toEqual('Address');
  expect(component.find('.summary__table-value').at(3).text()).toEqual('123 Fake St, Boston, MA 00000');
  expect(component.find('.summary__table-key').at(4).text()).toEqual('Phone');
  expect(component.find('.summary__table-value').at(4).text()).toEqual('(555) 934-2938');
  expect(component.find('.summary__table-key').at(5).text()).toEqual('PCP');
  expect(component.find('.summary__table-value').at(5).text()).toEqual('');
});

it('renders a profile picture correctly', () => {
  const component = setup(profileMockC);

  expect(component.find('.summary__image')).toExist();
  expect(component.find('.summary__image img[src="http://localhost:3001/photo.jpg"]')).toHaveLength(1);
});

it('renders self placeholder image correctly', () => {
  const component = setup(profileMockA);

  expect(component.find('.summary__image')).toExist();
  expect(component.find('.summary__image').find('svg').prop('xmlns')).toEqual('http://www.w3.org/2000/svg');
});

it('renders other placeholder image correctly', () => {
  const component = setup(profileMockB);

  expect(component.find('.summary__image')).toExist();
  expect(component.find('.summary__image').find('svg').prop('data-icon')).toEqual('user-circle');
});

it('summary fields are blank if null or undefined', () => {
  const component = setup(profileMockD);

  expect(component.find('.summary__table-value').at(0).text()).toEqual('John Doe');
  expect(component.find('.summary__table-value').at(1).text()).toEqual('');
  expect(component.find('.summary__table-value').at(2).text()).toEqual('');
  expect(component.find('.summary__table-value').at(3).text()).toEqual('');
  expect(component.find('.summary__table-value').at(4).text()).toEqual('');
  expect(component.find('.summary__table-value').at(5).text()).toEqual('');
});
