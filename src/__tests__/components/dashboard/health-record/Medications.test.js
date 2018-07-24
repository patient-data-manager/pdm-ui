import { fullRenderComponent } from '../../../../utils/testHelpers';
import Medications from '../../../../components/dashboard/health-record/Medications';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/medicationRequestMocks';

function setup() {
  const props = {
    medicationRequests: [mocks.medicationRequestMockA, mocks.medicationRequestMockB, mocks.medicationRequestMockC, mocks.medicationRequestMockD, mocks.medicationRequestMockE],
    medicationStatements: []
  };

  return fullRenderComponent(Medications, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.medications__table-label')).toExist();
  expect(component.find('div.medications__table')).toExist();
  expect(component.find(VerticalTimeline)).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the medication table correctly', () => {
  const component = setup();

  expect(component.find('div.medications__table-row')).toHaveLength(4);
});

it('sorts medication table correctly correctly', () => {
  const component = setup();

  expect(component.find('div.medications__table-medication').at(1).text() === 'Camila 28 Day Pack');
  expect(component.find('div.medications__table-medication').at(2).text() === '0.3 ML EPINEPHrine 0.5 MG/ML Auto-Injector');
  expect(component.find('div.medications__table-medication').at(3).text() === 'Loratadine 5 MG Chewable Tablet');
  expect(component.find('div.medications__table-medication').at(4).text() === 'Mirena 52 MG Intrauterine System');
});

it('displays no entries message if no medications', () => {
  const component = fullRenderComponent(Medications, {medicationRequests: [], medicationStatements:[]});

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.medications__table-label')).toHaveLength(0);
  expect(component.find('div.medications__table')).toHaveLength(0);
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});

it('table is not displayed if no current medications', () => {
  const component = fullRenderComponent(Medications, {medicationRequests: [mocks.medicationRequestMockB], medicationStatements:[]});

  expect(component.find('div.medications__table-container')).toHaveLength(0);
  expect(component.find('div.medications__table-label').text() === 'No current medications');
  expect(component.find(VerticalTimeline)).toExist();
});
