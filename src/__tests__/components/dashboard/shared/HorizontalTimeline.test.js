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

it('timeline is not displayed if there are no items to display', () => {
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

// all elements exist
// legend is displayed correctly
// range is displayed correctly and defaults to 1 yr
// clicking on range buttons works - right amount of icons
// scrolling works?
// test tooltips
