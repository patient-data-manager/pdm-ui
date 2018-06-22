import React from 'react';
import { Profile } from './Profile';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Profile />);
  wrapper.unmount();
});
