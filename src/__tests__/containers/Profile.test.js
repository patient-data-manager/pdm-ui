import React from 'react';
import { Profile } from '../../containers/Profile/Profile';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Profile />);
  wrapper.unmount();
});
