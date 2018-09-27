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
    },
    dashboard: {
      navIsOpen: false
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
  expect(component.find('Header')).toExist();
  expect(component.find('AppBar')).toExist();
  expect(component.find('Drawer')).toExist();
  expect(component.find('div.dashboard__body')).toExist();
});

it('renders each menu item correctly', () => {
  const component = setup();

  expect(component.find('MenuItem')).toExist();
  expect(component.find('MenuItem')).toHaveLength(4);
  expect(component.find('MenuItem').at(0).find('ListItemText').text()).toEqual('Profiles');
  expect(component.find('MenuItem').at(1).find('ListItemText').text()).toEqual('Health Record');
  expect(component.find('MenuItem').at(2).find('ListItemText').text()).toEqual('Alerts');
  expect(component.find('MenuItem').at(3).find('ListItemText').text()).toEqual('Providers');
});

it('renders the AppBar correctly', () => {
  const component = setup();

  expect(component.find('AppBar Paper')).toExist();
  expect(component.find('AppBar Toolbar')).toExist();
  expect(component.find('AppBar IconButton')).toExist();
  expect(component.find('AppBar ProfileCard')).toExist();
  expect(component.find('.user-icon')).toExist();
  expect(component.find('.details-name').text()).toEqual('Jane E Doe');
  expect(component.find('.details-age').text()).toEqual('36 YRS');
  expect(component.find('.details-gender').text()).toEqual('female');
});

it('renders the Drawer correctly', () => {
  const component = setup();

  expect(component.find('Drawer Paper')).toExist();
  expect(component.find('Drawer IconButton')).toExist();
  expect(component.find('Drawer ButtonBase')).toExist();
  expect(component.find('Drawer Divider')).toExist();
  expect(component.find('Drawer List')).toExist();
  expect(component.find('Drawer .nav-list-items')).toExist();
});
