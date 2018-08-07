import { fullRenderComponent } from '../../../../utils/testHelpers';
import LineGraph from '../../../../components/dashboard/shared/LineGraph';

function setup() {
  const props = {
    title: 'title goes here',
    data: [],
    referenceRanges: [],
    minPoints: 3
  };

  return fullRenderComponent(LineGraph, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  // expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  // expect(component.find('button.vertical-timeline__view-more')).toExist();
});