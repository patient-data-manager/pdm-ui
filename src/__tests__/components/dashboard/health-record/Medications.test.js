import { fullRenderComponent } from '../../../../utils/testHelpers';
import Medications from '../../../../components/dashboard/health-record/Medications';
import TableList from '../../../../components/dashboard/shared/TableList';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/medicationRequestMocks';

function setup() {
  const props = {
    medicationRequests: [
      mocks.medicationRequestMockA,
      mocks.medicationRequestMockB,
      mocks.medicationRequestMockC,
      mocks.medicationRequestMockD,
      mocks.medicationRequestMockE],
    medicationStatements: []
  };

  return fullRenderComponent(Medications, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find(TableList)).toExist();
  expect(component.find(VerticalTimeline)).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the medication table correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr')).toHaveLength(4);
});

it('sorts medication table correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr').at(0).text() === 'Mirena 52 MG Intrauterine System');
  expect(component.find('.table-list tbody tr').at(1).text() === 'Camila 28 Day Pack');
  expect(component.find('.table-list tbody tr').at(2).text() === '0.3 ML EPINEPHrine 0.5 MG/ML Auto-Injector');
  expect(component.find('.table-list tbody tr').at(3).text() === 'Loratadine 5 MG Chewable Tablet');
});

it('displays no entries message if no medications', () => {
  const component = fullRenderComponent(Medications, { medicationRequests: [], medicationStatements: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find(TableList)).toHaveLength(0);
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});

it('table is not displayed if no current medications', () => {
  const component = fullRenderComponent(Medications, 
    { medicationRequests: [mocks.medicationRequestMockB], medicationStatements: [] });

  expect(component.find(TableList)).toExist();
  expect(component.find('.table-list tbody tr')).toHaveLength(0);
  expect(component.find('.table-list div.no-entries')).toExist();
  expect(component.find(VerticalTimeline)).toExist();
});

it('it renders the vertical timeline correctly correctly', () => {
  const component = setup();

  expect(component.find(VerticalTimeline)).toExist();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
  expect(component.find('div.vertical-timeline__item-info').at(0).text() === 'Mirena 52 MG Intrauterine System');
  expect(component.find('div.vertical-timeline__item-info').at(1).text() === 'Camila 28 Day Pack');
  expect(component.find('div.vertical-timeline__item-info').at(2).text() === 'Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]');
});

