import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login';
import { shallow, mount, render } from 'enzyme';


it('renders without crashing', () => {
  const wrapper = shallow(<Login />);
  wrapper.unmount();
});
