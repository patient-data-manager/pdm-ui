import { fullRenderComponent } from '../../../../utils/testHelpers';
import VerticalList from '../../../../components/dashboard/shared/VerticalList';
import * as mocks from '../../../../__mocks__/verticalListMocks';

function setup() {
  const props = {
    list: mocks.verticalListMock,
    listType: 'procedures',
    dateProperty: 'date',
    descriptionProperty: 'description'
  };

  return fullRenderComponent(VerticalList, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('li.vertical-list__item')).toHaveLength(3);
  expect(component.find('div.vertical-list__view-more')).toExist();
});

it('view more button works correctly', () => {
  const component = setup();
  
  component.find('div.vertical-list__view-more').simulate('click');
  expect(component.find('li.vertical-list__item')).toHaveLength(6);
});
