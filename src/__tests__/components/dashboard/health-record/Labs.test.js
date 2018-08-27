import { fullRenderComponent } from '../../../../utils/testHelpers';
import Labs from '../../../../components/dashboard/health-record/Labs';
import VerticalTimeline from '../../../../components/dashboard/shared/VerticalTimeline';
import * as mocks from '../../../../__mocks__/labMocks';

function setup() {
  const props = {
    labs: [mocks.labMockA, mocks.labMockB, mocks.labMockC, mocks.labMockD,
      mocks.labMockE, mocks.labMockF, mocks.labMockG, mocks.labMockH]
  };
  return fullRenderComponent(Labs, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.labs')).toExist();
});

it('it renders and filters the lab results as a vertical timeline correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual("Blood Test (procedure) 15 L");
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Hematology test (procedure) 2 mL');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('White blood cell count (procedure) 5 mL');
});

it('view more button works correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('button.vertical-timeline__view-more')).toExist();
  component.find('button.vertical-timeline__view-more').simulate('click');
  expect(component.find('div.vertical-timeline__item')).toHaveLength(6);
  expect(component.find('div.vertical-timeline__item-info').at(3)
    .find('.info-description').text()).toEqual('White blood cell count (procedure) 5 mL');
});

it('groups and displays lab values as graphs', () => {


});

it('displays no entries message if no lab entries are present', () => {
  const component = fullRenderComponent(Labs, { labs: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find(VerticalTimeline)).toHaveLength(0);
});
