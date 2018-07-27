import { fullRenderComponent } from '../../../../utils/testHelpers';
import Vitals from '../../../../components/dashboard/health-record/Vitals';
import * as mocks from '../../../../__mocks__/vitalMocks';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';

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
});

it('it renders and filters the vital results as a vertical timeline correctly and displays top 3 results initially', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Body Temperature 98 F');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Body Temperature 97 F');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Heart rate (observable) 50 bpm');
});

it('view more button works correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(4);
  expect(component.find('div.vertical-timeline__item-info').at(3)
    .find('.info-description').text()).toEqual('Heart rate (observable) 40 bpm');
});

it('displays no entries message if no vital entries are present', () => {
  const component = fullRenderComponent(Vitals, { vitals: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});
