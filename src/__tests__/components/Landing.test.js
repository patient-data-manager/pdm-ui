import React from 'react';
import Landing from '../../components/Landing';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Landing />);
  wrapper.unmount();
});
