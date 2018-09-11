import { fullRenderComponent } from '../../../../utils/testHelpers';
import Allergies from '../../../../components/dashboard/health-record/Allergies';
import * as mocks from '../../../../__mocks__/allergyMocks';

function setup() {
  const props = {
    allergies: [
      mocks.allergyMockA,
      mocks.allergyMockB,
      mocks.allergyMockC,
      mocks.allergyMockD,
      mocks.allergyMockE
    ]
  };

  return fullRenderComponent(Allergies, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.table-list')).toExist();
  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('displays no entries message if no allergies', () => {
  const component = fullRenderComponent(Allergies, { allergies: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.table-list')).toHaveLength(0);
  expect(component.find('div.vertical-timeline')).toHaveLength(0);
});

it('it renders, filters and sorts the condition table correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr')).toHaveLength(3);
  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Allergy to grass pollen');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Allergy to peanuts');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Dander (animal) allergy');
});

it('table is not displayed if no current allergies', () => {
  const component = fullRenderComponent(Allergies, { allergies: [mocks.allergyMockB] });

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
    .find('.info-description').text()).toEqual('Allergy to substance (disorder)');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Allergy to grass pollen');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Allergy to mould');
});
