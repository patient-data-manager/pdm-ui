import { fullRenderComponent } from '../../../../utils/testHelpers';
import CustomGraphTooltip from '../../../../components/dashboard/shared/CustomGraphTooltip';

function setup() {
  const props = {
    title: 'title goes here',
    payload: []
  };

  return fullRenderComponent(CustomGraphTooltip, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  // expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  // expect(component.find('button.vertical-timeline__view-more')).toExist();
});