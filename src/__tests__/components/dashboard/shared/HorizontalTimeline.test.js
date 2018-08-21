import Timeline from 'react-calendar-timeline/lib';
import { fullRenderComponent } from '../../../../utils/testHelpers';
import HorizontalTimeline from '../../../../components/dashboard/shared/HorizontalTimeline';
import * as mocks from '../../../../__mocks__/horizontalTimelineMocks';

function setup() {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: mocks.itemsMock,
    legendItems: mocks.legendItemsMock,
    rangeItems: mocks.rangeItemsMock,
    // defaultRange: PropTypes.string, // a rangeText from rangeItems
    // stackItems: PropTypes.bool
  };

  return fullRenderComponent(HorizontalTimeline, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.header-title')).toExist();
  expect(component.find('div.header-title').text()).toEqual('this is a title');
  expect(component.find('div.header-buttons')).toExist();
  expect(component.find(Timeline)).toExist();
  expect(component.find('div.horizontal-timeline__legend')).toExist();
  expect(component.find('div.footer-text')).toExist();
  expect(component.find('div.footer-text').text()).toEqual('zoom in/out, click and drag, or choose a button above');
});

it('timeline is not displayed if there are no items passed in', () => {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: [],
    legendItems: mocks.legendItemsMock,
    rangeItems: mocks.rangeItemsMock,
  };
  const component = fullRenderComponent(HorizontalTimeline, props);

  expect(component).toBeDefined();
  expect(component.find('div.horizontal-timeline')).toHaveLength(0);
  expect(component.find(Timeline)).toHaveLength(0);
});

it('renders legend correctly', () => {
  const component = setup();

  expect(component.find('div.legend-item')).toHaveLength(4);
  expect(component.find('div.legend-item__text').at(0).text()).toEqual(': procedure');
  expect(component.find('div.legend-item__icon').find('svg').at(0).prop('data-icon')).toEqual('hospital');
  expect(component.find('div.legend-item__text').at(1).text()).toEqual(': lab');
  expect(component.find('div.legend-item__icon').find('svg').at(1).prop('data-icon')).toEqual('flask');
  expect(component.find('div.legend-item__text').at(2).text()).toEqual(': condition');
  expect(component.find('div.legend-item__icon').find('svg').at(2).prop('data-icon')).toEqual('heartbeat');
  expect(component.find('div.legend-item__text').at(3).text()).toEqual(': medication');
  expect(component.find('div.legend-item__icon').find('svg').at(3).prop('data-icon')).toEqual('pills');
});

it('displays no legend if there are no legend items', () => {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: mocks.itemsMock,
    legendItems: [],
    rangeItems: mocks.rangeItemsMock,
  };
  const component = fullRenderComponent(HorizontalTimeline, props);

  expect(component.find('div.horizontal-timeline__footer')).toExist();
  expect(component.find('div.horizontal-timeline__legend')).toHaveLength(0);
});

// all icon dots exist
// range is displayed correctly and defaults to 1 yr
// clicking on range buttons works - right amount of icons
// scrolling works?
// test tooltips

