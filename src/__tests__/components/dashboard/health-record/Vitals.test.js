import { fullRenderComponent } from '../../../../utils/testHelpers';
import Vitals from '../../../../components/dashboard/health-record/Vitals';
import * as mocks from '../../../../__mocks__/vitalMocks';

function setup() {
  const props = {
    vitals: [mocks.vitalMockA, mocks.vitalMockB, mocks.vitalMockC, mocks.vitalMockD]
  };
  return fullRenderComponent(Vitals, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.vitals')).toExist();
  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the vital results as a vertical timeline correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Body Height 165.28 cm');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Systolic Blood Pressure 101.51 mmHg');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Diastolic Blood Pressure 70.91 mmHg');
});

it('displays no entries message if no vital entries are present', () => {
  const component = fullRenderComponent(Vitals, { vitals: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.vertical-timeline')).toHaveLength(0);
});