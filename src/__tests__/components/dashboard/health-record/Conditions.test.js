import { fullRenderComponent } from '../../../../utils/testHelpers';
import Conditions from '../../../../components/dashboard/health-record/Conditions';
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
  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.table-list')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders, filters and sorts the condition table correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr')).toHaveLength(3);
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Hypertension');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Perennial allergic rhinitis');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Osteoporosis (disorder)');
});

it('displays no entries message if no conditions', () => {
  const component = fullRenderComponent(Conditions, { conditions: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.table-list')).toHaveLength(0);
  expect(component.find('div.vertical-timeline')).toHaveLength(0);
});

it('table is not displayed if no current conditions', () => {
  const component = fullRenderComponent(Conditions, { conditions: [mocks.conditionMockA] });

  expect(component.find('div.table-list')).toExist();
  expect(component.find('.table-list tbody tr')).toHaveLength(0);
  expect(component.find('.table-list div.no-entries')).toExist();
  expect(component.find('div.vertical-timeline')).toExist();
});

it('it renders the vertical timeline correctly correctly', () => {
  const component = setup();

  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Viral sinusitis (disorder)');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Hypertension');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Viral sinusitis (disorder)');
});
