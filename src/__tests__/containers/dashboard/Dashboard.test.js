import { fullRenderContainer } from '../../../utils/testHelpers';
import Dashboard from '../../../containers/dashboard/Dashboard';
import { profileMockA } from '../../../__mocks__/profileMocks';

function setup() {
  const store = {
    auth: {
      username: 'abcd',
      isAuthenticated: 'true'
    },
    profiles: {
      activeProfile: profileMockA,
    }
  };

  const props = {
    authUser: 'abcd',
    activeProfile: profileMockA,
    classes: {},
    theme: {},
    logoutUser: jest.fn()
  };

  return fullRenderContainer(Dashboard, props, store);
}


it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.dashboard')).toExist();
  expect(component.find('div.dashboard__body')).toExist();
  expect(component.find('div.nav-list-items')).toExist();
});

it('shows a menu with the four labels', () => {
  const component = setup();
  expect(component.find('MenuItem')).toExist();
  expect(component.find('MenuItem')).toHaveLength(4);
  expect(component.find('MenuItem').at(0).find('ListItemText').text()).toEqual('Profiles');
  expect(component.find('MenuItem').at(1).find('ListItemText').text()).toEqual('Health Record');
  expect(component.find('MenuItem').at(2).find('ListItemText').text()).toEqual('Alerts');
  expect(component.find('MenuItem').at(3).find('ListItemText').text()).toEqual('Providers');
});

it('creates the icon buttons', () => {
  const component = setup();
  expect(component.find('IconButton')).toExist();
  expect(component.find('IconButton')).toHaveLength(2);
});

it('properly expand and close the menu when clicking icon button', () => {
  const component = setup();
  expect(component.find('Drawer').find('IconButton')).toExist();
  expect(component.find('.app-toolbar button')).toExist();
  component.find('.app-toolbar button').simulate('click');
  expect(component.find('Drawer.drawing-class')).toExist();
});
