import { fullRenderComponent } from '../../../../utils/testHelpers';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/verticalTimelineMocks';

function setup() {
  const props = {
    items: mocks.verticalListMock,
    icon: 'syringe',
    initialDisplayCount: 2,
    viewCount: 4,
  };

  return fullRenderComponent(VerticalTimeline, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(2);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
});

it('view more button works correctly', () => {
  const component = setup();

  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(6);
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(10);
});

it('view less button works correctly', () => {
  const component = setup();

  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(6);
  component.find('button.vertical-timeline__view-less').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(4);
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(8);
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(10);
  component.find('button.vertical-timeline__view-less').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(6);
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(10);
  component.find('button.vertical-timeline__view-less').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(6);
  component.find('button.vertical-timeline__view-less').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(4);
});

it('sorts the timeline correctly', () => {
  const component = setup();

  // expand the whole timeline
  component.find('button.vertical-timeline__view-more').simulate('click');
  component.find('button.vertical-timeline__view-more').simulate('click');

  // test to make sure the list is sorted
  expect(component.find('div.info-description').at(0).text()).toEqual('1');
  expect(component.find('div.info-description').at(1).text()).toEqual('2');
  expect(component.find('div.info-description').at(2).text()).toEqual('3');
  expect(component.find('div.info-description').at(3).text()).toEqual('4');
  expect(component.find('div.info-description').at(4).text()).toEqual('5');
  expect(component.find('div.info-description').at(5).text()).toEqual('6');
  expect(component.find('div.info-description').at(6).text()).toEqual('7');
  expect(component.find('div.info-description').at(7).text()).toEqual('8');
  expect(component.find('div.info-description').at(8).text()).toEqual('9');
  expect(component.find('div.info-description').at(9).text()).toEqual('10');
});
