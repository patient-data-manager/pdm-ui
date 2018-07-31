import { fullRenderComponent } from '../../../../utils/testHelpers';
import Immunizations from '../../../../components/dashboard/health-record/Immunizations';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/immunizationMocks';

function setup() {
  const props = {
    immunizations: [mocks.immunizationMockA, mocks.immunizationMockB, mocks.immunizationMockC, mocks.immunizationMockD]
  };
  return fullRenderComponent(Immunizations, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.immunizations')).toExist();
});

it('it renders and filters the lab results as a vertical timeline correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Flu Shot');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Rabies Vaccine');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Tetnis Shot');
});

it('view more button works correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(4);
  expect(component.find('div.vertical-timeline__item-info').at(3)
    .find('.info-description').text()).toEqual('Chicken Pox Vaccine');
});

it('displays no entries message if no lab entries are present', () => {
  const component = fullRenderComponent(Immunizations, { immunizations: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});
