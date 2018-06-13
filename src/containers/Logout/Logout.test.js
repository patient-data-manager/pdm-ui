import React from 'react';
import ReactDOM from 'react-dom';
import { Logout } from './Logout';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  let mockLogoutFn = () => {};
  let mockHashHistory = [];
  const wrapper = shallow(<Logout logOut={mockLogoutFn} hashHistory={mockHashHistory}/>);
  wrapper.unmount();
});
