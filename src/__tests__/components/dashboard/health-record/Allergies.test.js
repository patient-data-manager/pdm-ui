import { fullRenderComponent } from '../../../../utils/testHelpers';
import Allergies from '../../../../components/dashboard/health-record/Allergies';
import * as mocks from '../../../../__mocks__/allergyMocks';

function setup() {
  const props = {
    allergies: [mocks.allergyMockA, mocks.allergyMockB, mocks.allergyMockC],
  };

  return fullRenderComponent(Allergies, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.allergies__table-label')).toExist();
  expect(component.find('div.allergies__table')).toExist();
});

it('it renders allergy table', () => {
  const component = setup();

  expect(component.find('div.allergies__table-row')).toHaveLength(3);
});

it('sorts allergy table correctly correctly', () => {
  const component = setup();

  expect(component.find('div.allergies__table-allergy').at(1).text() === 'Allergy to grass pollen');
  expect(component.find('div.allergies__table-allergy').at(1).text() === 'Dander (animal) allergy');
  expect(component.find('div.allergies__table-allergy').at(2).text() === 'Allergy to mould');
});
