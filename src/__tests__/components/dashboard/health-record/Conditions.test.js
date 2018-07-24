import { fullRenderComponent } from '../../../../utils/testHelpers';
import Conditions from '../../../../components/dashboard/health-record/Conditions';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/conditionMocks';

function setup() {
  const props = {
    conditions: [
      mocks.conditionMockA, 
      mocks.conditionMockB, 
      mocks.conditionMockC, 
      mocks.conditionMockD, 
      mocks.conditionMockE
    ]
  };
  return fullRenderComponent(Conditions, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.conditions__table-label')).toExist();
  expect(component.find('div.conditions__table')).toExist();
  expect(component.find(VerticalTimeline)).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the condition table correctly', () => {
  const component = setup();

  expect(component.find('div.conditions__table-row')).toHaveLength(3);
});

it('sorts condition table correctly correctly', () => {
  const component = setup();

  expect(component.find('div.conditions__table-condition').at(1).text() === 'Hypertension');
  expect(component.find('div.conditions__table-condition').at(2).text() === 'Perennial allergic rhinitis');
  expect(component.find('div.conditions__table-condition').at(3).text() === 'Osteoporosis (disorder)');
});

it('displays no entries message if no conditions', () => {
  const component = fullRenderComponent(Conditions, { conditions: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.conditions__table-label')).toHaveLength(0);
  expect(component.find('div.conditions__table')).toHaveLength(0);
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});

it('table is not displayed if no current conditions', () => {
  const component = fullRenderComponent(Conditions, { conditions: [mocks.conditionMockA] });

  expect(component.find('div.conditions__table-container')).toHaveLength(0);
  expect(component.find('div.conditions__table-label').text() === 'No current conditions');
  expect(component.find(VerticalTimeline)).toExist();
});