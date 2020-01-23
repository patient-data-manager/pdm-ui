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
    defaultRange: '3mo'
  };

  return fullRenderComponent(HorizontalTimeline, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.horizontal-timeline__header').find('h5')).toExist();
  expect(component.find('div.horizontal-timeline__header').find('h5').text()).toEqual('this is a title');
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
    rangeItems: mocks.rangeItemsMock,
  };
  const component = fullRenderComponent(HorizontalTimeline, props);

  expect(component.find('div.horizontal-timeline__footer')).toExist();
  expect(component.find('div.horizontal-timeline__legend')).toHaveLength(0);
});

it('renders range option buttons correctly', () => {
  const component = setup();

  expect(component.find('button.timeline-button')).toHaveLength(7);
  expect(component.find('button.timeline-button').at(0).text()).toEqual('1mo');
  expect(component.find('button.timeline-button').at(0).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(1).text()).toEqual('3mo');
  expect(component.find('button.timeline-button').at(1).hasClass('active')).toBeTruthy();
  expect(component.find('button.timeline-button').at(2).text()).toEqual('6mo');
  expect(component.find('button.timeline-button').at(2).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(3).text()).toEqual('1yr');
  expect(component.find('button.timeline-button').at(3).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(4).text()).toEqual('3yr');
  expect(component.find('button.timeline-button').at(4).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(5).text()).toEqual('10yr');
  expect(component.find('button.timeline-button').at(5).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(6).text()).toEqual('all');
  expect(component.find('button.timeline-button').at(6).hasClass('active')).toBeFalsy();
});

it('displays default range options if not defined', () => {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: mocks.itemsMock,
    legendItems: mocks.legendItemsMock,
  };
  const component = fullRenderComponent(HorizontalTimeline, props);

  expect(component.find('button.timeline-button')).toHaveLength(6);
  expect(component.find('button.timeline-button').at(0).text()).toEqual('1mo');
  expect(component.find('button.timeline-button').at(0).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(1).text()).toEqual('3mo');
  expect(component.find('button.timeline-button').at(1).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(2).text()).toEqual('6mo');
  expect(component.find('button.timeline-button').at(2).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(3).text()).toEqual('1yr');
  expect(component.find('button.timeline-button').at(3).hasClass('active')).toBeTruthy();
  expect(component.find('button.timeline-button').at(4).text()).toEqual('5yr');
  expect(component.find('button.timeline-button').at(4).hasClass('active')).toBeFalsy();
  expect(component.find('button.timeline-button').at(5).text()).toEqual('all');
  expect(component.find('button.timeline-button').at(5).hasClass('active')).toBeFalsy();
});

it('renders the graph and tooltips correctly', () => {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: mocks.itemsMock,
    legendItems: mocks.legendItemsMock,
    rangeItems: mocks.rangeItemsMock,
    defaultRange: 'all'
  };
  const component = fullRenderComponent(HorizontalTimeline, props);

  expect(component.find('div.rct-header')).toExist();
  expect(component.find('div.rct-today')).toExist();
  expect(component.find('div.timeline-item')).toHaveLength(7);
  expect(component.find('.horizontal-timeline__tooltip')).toHaveLength(7);
});

// it('clicking on the range button adjusts the viewable portion of the graph', () => {
//   const component = setup();

//   expect(component.find('div.timeline-item')).toHaveLength(1);
//   expect(component.find('div.timeline-item').prop('title')).toEqual('Documentation of current medications');

//   component.find('button.timeline-button').at(0).simulate('click'); // 1 month
//   expect(component.find('div.timeline-item')).toHaveLength(0);

//   component.find('button.timeline-button').at(2).simulate('click'); // 6 months
//   expect(component.find('div.timeline-item')).toHaveLength(1);
//   expect(component.find('div.timeline-item').prop('title')).toEqual('Documentation of current medications');

//   component.find('button.timeline-button').at(3).simulate('click'); // 1 year
//   expect(component.find('div.timeline-item')).toHaveLength(1);
//   expect(component.find('div.timeline-item').prop('title')).toEqual('Documentation of current medications');

//   component.find('button.timeline-button').at(4).simulate('click'); // 3 years
//   expect(component.find('div.timeline-item')).toHaveLength(2);
//   expect(component.find('div.timeline-item').at(0).prop('title')).toEqual('Documentation of current medications');
//   expect(component.find('div.timeline-item').at(1).prop('title')).toEqual('Camila 28 Day Pack');

//   component.find('button.timeline-button').at(5).simulate('click'); // 10 years
//   expect(component.find('div.timeline-item')).toHaveLength(3);
//   expect(component.find('div.timeline-item').at(0).prop('title')).toEqual('Documentation of current medications');
//   expect(component.find('div.timeline-item').at(1).prop('title')).toEqual('Low Density Lipoprotein Cholesterol');
//   expect(component.find('div.timeline-item').at(2).prop('title')).toEqual('Camila 28 Day Pack');

//   component.find('button.timeline-button').at(6).simulate('click'); // all
//   expect(component.find('div.timeline-item')).toHaveLength(7);
//   expect(component.find('div.timeline-item').at(0).prop('title')).toEqual('Documentation of current medications');
//   expect(component.find('div.timeline-item').at(1).prop('title')).toEqual('Colonoscopy');
//   expect(component.find('div.timeline-item').at(2).prop('title')).toEqual('Viral sinusitis (disorder)');
//   expect(component.find('div.timeline-item').at(3).prop('title')).toEqual('Perennial allergic rhinitis');
//   expect(component.find('div.timeline-item').at(4).prop('title')).toEqual('Triglycerides');
//   expect(component.find('div.timeline-item').at(5).prop('title')).toEqual('Low Density Lipoprotein Cholesterol');
//   expect(component.find('div.timeline-item').at(6).prop('title')).toEqual('Camila 28 Day Pack');
// });
