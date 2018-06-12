import React from 'react';
import ReactDOM from 'react-dom';
import { Register } from './Register';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Register />);
  wrapper.unmount();
});
