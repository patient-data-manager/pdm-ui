import { fullRenderComponent } from '../../../../utils/testHelpers';
import HorizontalTimeline from '../../../../components/dashboard/shared/HorizontalTimeline';
import * as mocks from '../../../../__mocks__/horizontalTimelineMocks';

function setup() {
  const props = {
    title: 'this is a title',
    groups: mocks.groupsMock,
    items: [],
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
  // expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  // expect(component.find('button.vertical-timeline__view-more')).toExist();
});