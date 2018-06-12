import React from 'react';
import ReactDOM from 'react-dom';
import Page500 from './Page500';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Page500 />);
  wrapper.unmount();
});
