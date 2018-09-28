import { fullRenderContainer } from '../../../utils/testHelpers';
import Alerts from '../../../containers/dashboard/Alerts';

function setup() {
  const store = {};
  const props = {};

  return fullRenderContainer(Alerts, props, store);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.alerts')).toExist();
});

it('renders the alerts lists correctly', () => {
  const component = setup();

  expect(component.find('div.alerts-list')).toHaveLength(2);
  expect(component.find('div.alerts-list__title').at(0).text()).toEqual('Alerts (3)');
  expect(component.find('div.alerts-list__title').at(1).text()).toEqual('Recently Approved');
  expect(component.find('div.vertical-timeline')).toHaveLength(2);
  expect(component.find('div.vertical-timeline').at(0).find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline').at(0).find('button.vertical-timeline__view-more')).toHaveLength(0);
  expect(component.find('div.vertical-timeline').at(1).find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline').at(1).find('button.vertical-timeline__view-more')).toExist();
});

// TO-DO: add alert view button works test

it('clicking the approve button updates the alerts list', () => {
  const component = setup();
  const alertItem = component.find('div.vertical-timeline').at(0).find('div.vertical-timeline__item').at(1);
  alertItem.find('div.item__approve-button').find('button').simulate('click');
  expect(component.find('div.vertical-timeline').at(0).find('div.vertical-timeline__item')).toHaveLength(2);
});

// TO-DO: approving all alerts displays no entries message

it('the approve button is disabled if the alert has any conflicts', () => {
  const component = setup();
  const alertItem = component.find('div.vertical-timeline').at(0).find('div.vertical-timeline__item').at(0);
  expect(alertItem.find('div.item__approve-button').find('button').prop('disabled')).toBeTruthy();
});
