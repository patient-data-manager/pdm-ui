import { fullRenderComponent } from '../../../../utils/testHelpers';
import Allergies from '../../../../components/dashboard/health-record/Allergies';
import TableList from '../../../../components/dashboard/shared/TableList';
import * as mocks from '../../../../__mocks__/allergyMocks';

function setup() {
  const props = {
    allergies: [mocks.allergyMockA, mocks.allergyMockB, mocks.allergyMockC]
  };

  return fullRenderComponent(Allergies, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find(TableList)).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders allergy table', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr')).toHaveLength(3);
});

it('sorts allergy table correctly', () => {
  const component = setup();

  expect(component.find('.table-list tbody tr').at(0).find('td').at(0).text()).toEqual('Allergy to grass pollen');
  expect(component.find('.table-list tbody tr').at(1).find('td').at(0).text()).toEqual('Allergy to mould');
  expect(component.find('.table-list tbody tr').at(2).find('td').at(0).text()).toEqual('Dander (animal) allergy');
});

it('displays no entries message if no allergies', () => {
  const component = fullRenderComponent(Allergies, { allergies: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find(TableList)).toHaveLength(0);
});