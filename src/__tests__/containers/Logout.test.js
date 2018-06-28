import React from 'react';
import { Logout } from '../../containers/Logout/Logout';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  let mockLogoutFn = () => {};
  let mockHashHistory = [];
  const wrapper = shallow(<Logout logOut={mockLogoutFn} hashHistory={mockHashHistory}/>);
  wrapper.unmount();
});
