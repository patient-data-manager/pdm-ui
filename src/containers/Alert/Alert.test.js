import React from 'react';
import { Alert } from './Alert';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Alert />);
  wrapper.unmount();
});
