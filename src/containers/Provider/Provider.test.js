import React from 'react';
import { Provider } from './Provider';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Provider />);
  wrapper.unmount();
});
