import { fullRenderComponent } from '../../../../utils/testHelpers';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/verticalListMocks';

function setup() {
  const props = {
    items: mocks.verticalListMock,
    icon: 'syringe'
  };

  return fullRenderComponent(VerticalTimeline, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('.vertical-timeline__view-more')).toExist();
});

it('view more button works correctly', () => {
  const component = setup();

  component.find('.vertical-timeline__view-more').simulate('click');
  expect(component.find('.vertical-timeline__item')).toHaveLength(6);
});
