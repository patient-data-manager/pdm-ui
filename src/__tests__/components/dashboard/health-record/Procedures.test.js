import { fullRenderComponent } from '../../../../utils/testHelpers';
import Procedures from '../../../../components/dashboard/health-record/Procedures';
import * as mocks from '../../../../__mocks__/procedureMocks';

function setup() {
  const props = {
    procedures: [
      mocks.procedureMockA,
      mocks.procedureMockB,
      mocks.procedureMockC,
      mocks.procedureMockD
    ]
  };

  return fullRenderComponent(Procedures, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.procedures')).toExist();
  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the lab results as a vertical timeline correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Electrical cardioversion');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Catheter ablation of tissue of heart');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Colonoscopy');
});

it('displays no entries message if no lab entries are present', () => {
  const component = fullRenderComponent(Procedures, { procedures: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.vertical-timeline')).toHaveLength(0);
});