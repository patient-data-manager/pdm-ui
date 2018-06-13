import React from 'react';
import ReactDOM from 'react-dom';
import Page404 from './Page404';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Page404 />);
  wrapper.unmount();
});
